const Complaint = require("../Models/Complaint");
const User = require("../Models/userModel");
const Notification = require("../Models/Notification");

exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    // Validation for description length
    if (description.length < 10) {
      return res
        .status(400)
        .json({ message: "Description must be at least 10 characters." });
    }

    // Capture multiple file paths
    const filePaths = req.files.map(
      (file) => `/uploads/complaints/${file.filename}`
    );

    // Create new complaint
    const newComplaint = new Complaint({
      user: req.user.id, // From auth middleware
      title,
      category,
      description,
      images: filePaths,
    });

    await newComplaint.save();

    // -----------------------------------------------
    // 🧩 Create Notification for Admin(s)
    // -----------------------------------------------

    // 1️⃣ Find all admin users
    const admins = await User.find({ role: "admin" });

    // 2️⃣ Prepare notifications for each admin
    const notificationsToCreate = admins.map((admin) => ({
      recipient: admin._id,
      sender: req.user._id,
      title: "New Complaint Submitted",
      message: `${req.user.fullName} submitted a complaint titled "${title}".`,
      type: "new_complaint",
      complaintId: newComplaint._id,
    }));

    // 3️⃣ Save notifications in DB
    if (notificationsToCreate.length > 0) {
      await Notification.insertMany(notificationsToCreate);
    }

    // -----------------------------------------------
    // ✅ Response
    // -----------------------------------------------
    res.status(201).json({
      message: "Complaint submitted successfully!",
      complaint: newComplaint,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit complaint", error: error.message });
  }
};

exports.getUserComplaints = async (req, res) => {
  try {
    // req.user.id comes from your 'protect' middleware
    const complaints = await Complaint.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

// New controller to add comments to a complaint
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    // Format role: "student" -> "Student"
    const rawRole = req.user.role || "student";
    const formattedRole = rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase();

    const newComment = {
      text,
      senderId: req.user._id,
      senderName: req.user.fullName, 
      role: formattedRole,
      createdAt: new Date(),
    };

    // Add comment to complaint
    complaint.comments.push(newComment);
    await complaint.save();

    // -------------------------------
    // NOTIFICATION LOGIC
    // -------------------------------

    // 1️⃣ Determine recipients
    const recipients = new Set();

    // Admins always notified
    const admins = await User.find({ role: "admin" });
    admins.forEach(a => recipients.add(a._id.toString()));

    // Student notified if sender is not student
    if (req.user.role !== "student") recipients.add(complaint.user.toString());

    // Faculty notified if sender is not faculty
    if (req.user.role !== "faculty" && complaint.assignedTo) {
      recipients.add(complaint.assignedTo.toString());
    }

    // Remove sender from recipients
    recipients.delete(req.user._id.toString());

    // 2️⃣ Create notifications for each recipient
    const notificationsToCreate = [];
    recipients.forEach(recipientId => {
      notificationsToCreate.push({
        recipient: recipientId,
        sender: req.user._id,
        title: `New Comment on Complaint`,
        message: `${req.user.fullName} commented on complaint "${complaint.title}"`,
        type: "comment",
        complaintId: complaint._id,
      });
    });

    if (notificationsToCreate.length > 0) {
      await Notification.insertMany(notificationsToCreate);
    }

    res.status(200).json(newComment);
  } catch (error) {
    console.error("Comment Error:", error);
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};


exports.addComplaint = async (req, res) => {
  try {
    const { title, category, description, images } = req.body;

    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const complaint = new Complaint({
      user: req.user._id,
      title,
      category,
      description,
      images,
    });

    await complaint.save();

    // Notify admins about new complaint
    const admins = await User.find({ role: "admin" });
    const notifications = admins.map((admin) => ({
      recipient: admin._id,
      sender: req.user._id,
      title: "New Complaint Submitted",
      message: `${req.user.fullName} submitted a new complaint: "${title}"`,
      type: "new_complaint",
      complaintId: complaint._id,
    }));

    if (notifications.length > 0) await Notification.insertMany(notifications);

    res.status(201).json(complaint);
  } catch (error) {
    console.error("Add Complaint Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ----------------------------
// 2️⃣ Assign Complaint to Faculty
// ----------------------------
exports.assignComplaint = async (req, res) => {
  try {
    const { complaintId, facultyId } = req.body;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.assignedTo = facultyId;
    complaint.status = "In Progress";
    await complaint.save();

    // Notify assigned faculty
    await Notification.create({
      recipient: facultyId,
      sender: req.user._id,
      title: "Complaint Assigned",
      message: `You have been assigned to complaint "${complaint.title}"`,
      type: "assignment",
      complaintId: complaint._id,
    });

    // Notify admins
    const admins = await User.find({ role: "admin" });
    const adminNotifications = admins.map((admin) => ({
      recipient: admin._id,
      sender: req.user._id,
      title: "Complaint Assigned",
      message: `Complaint "${complaint.title}" assigned to faculty.`,
      type: "assignment",
      complaintId: complaint._id,
    }));
    if (adminNotifications.length > 0) await Notification.insertMany(adminNotifications);

    res.status(200).json({ message: "Complaint assigned successfully", complaint });
  } catch (error) {
    console.error("Assign Complaint Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


//Resolve Complaint
exports.resolveComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = "Resolved";
    await complaint.save();

    // Notify student
    await Notification.create({
      recipient: complaint.user,
      sender: req.user._id,
      title: "Complaint Resolved",
      message: `Your complaint "${complaint.title}" has been resolved`,
      type: "resolved",
      complaintId: complaint._id,
    });

    // Notify assigned faculty
    if (complaint.assignedTo) {
      await Notification.create({
        recipient: complaint.assignedTo,
        sender: req.user._id,
        title: "Complaint Resolved",
        message: `Complaint "${complaint.title}" assigned to you has been resolved`,
        type: "resolved",
        complaintId: complaint._id,
      });
    }

    // Notify admins
    const admins = await User.find({ role: "admin" });
    const adminNotifications = admins.map((admin) => ({
      recipient: admin._id,
      sender: req.user._id,
      title: "Complaint Resolved",
      message: `Complaint "${complaint.title}" has been resolved`,
      type: "resolved",
      complaintId: complaint._id,
    }));
    if (adminNotifications.length > 0) await Notification.insertMany(adminNotifications);

    res.status(200).json({ message: "Complaint resolved successfully", complaint });
  } catch (error) {
    console.error("Resolve Complaint Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email role")
      .populate("comments.senderId", "name role");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    console.error("Error fetching complaint:", error);
    res.status(500).json({ message: "Server error while fetching complaint" });
  }
};