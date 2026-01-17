const Complaint = require("../Models/Complaint");
const User = require("../Models/userModel");
const Notification = require("../Models/Notification");

// @desc Get all complaints assigned to the Faculty
exports.getAssignedComplaints = async (req, res) => {
  try {
    // 1. Find the faculty member
    const faculty = await User.findById(req.user.id);

    // ✅ Only allow faculty/staff roles
    if (!faculty || (faculty.role !== "faculty" && faculty.role !== "staff")) {
      return res.status(403).json({ message: "Access denied. Faculty only." });
    }

    // 2. Find complaints assigned to this faculty
    const complaints = await Complaint.find({ assignedTo: faculty._id })
      .populate("user", "fullName studentId")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Update complaint status and notify student
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    // ✅ Determine notification type safely
    let notificationType = "status_update";
    if (status.toLowerCase() === "resolved") {
      notificationType = "resolved"; // matches your Notification schema enum
    }

    // Notify the student
    await Notification.create({
      recipient: complaint.user,
      sender: req.user.id,
      title: "Complaint Status Updated",
      message: `Your complaint "${complaint.title}" is now marked as ${status}.`,
      type: notificationType,
      complaintId: complaint._id,
    });

    res.status(200).json({ message: `Status updated to ${status}`, complaint });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// @desc Faculty informs admin that they have resolved the complaint
exports.informAdminResolution = async (req, res) => {
  try {
    console.log("User ID:", req.user.id);
    console.log("Complaint ID:", req.params.id);

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      console.log("Complaint not found");
      return res.status(404).json({ message: "Complaint not found" });
    }

    console.log("Complaint found:", complaint);

    // Only allow assigned faculty
    if (String(complaint.assignedTo) !== String(req.user.id)) {
      console.log("AssignedTo mismatch", complaint.assignedTo, req.user.id);
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update complaint
    complaint.facultyAction = "Requested Resolution";
    complaint.status = "Pending Admin Approval"; // <-- important
    await complaint.save();
    console.log("Complaint updated and saved");

    // Notify admins
    const admins = await User.find({ role: "admin" });
    console.log("Admins found:", admins.length);

    const notifications = admins.map((admin) => ({
      recipient: admin._id,
      sender: req.user.id,
      title: "Faculty Requesting Resolution",
      message: `Faculty ${req.user.fullName || req.user.email || "Unknown"} has marked complaint "${complaint.title}" as resolved and requests admin approval.`,
      type: "faculty_request_resolution",
      complaintId: complaint._id,
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
      console.log("Notifications inserted");
    } else {
      console.log("No admins to notify");
    }

    res.status(200).json({ message: "Admin has been notified", complaint });
  } catch (error) {
    console.error("Inform Admin Error:", error);
    res.status(500).json({ message: "Failed to notify admin", error: error.message });
  }
};


