const Complaint = require("../Models/Complaint");
const User = require("../Models/userModel");
const Notification = require("../Models/Notification");

// @desc Get all complaints and analytics for admin dashboard
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "fullName studentId department") // Populate required user fields
      .sort({ createdAt: -1 });

    // Format complaints for table
    const formatted = complaints.map((c) => ({
      id: c._id,
      studentName: c.user?.fullName || "Unknown Student",
      studentId: c.user?.studentId || "N/A",
      department: c.user?.department || "N/A", // ✅ fetch department from populated user
      title: c.title,
      category: c.category,
      status: c.status,
      priority: c.priority,
      date: c.createdAt
        ? new Date(c.createdAt).toISOString().split("T")[0]
        : "",
      resolutionTime: c.resolutionTime || 0,
    }));

    // ====== 📊 ANALYTICS ======

    // Pie chart: count complaints by category
    const categoryMap = {};
    complaints.forEach((c) => {
      const category = c.category || "Other";
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });
    const categoryData = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));

    // Bar chart: complaints per month
    const monthMap = {};
    complaints.forEach((c) => {
      const month = new Date(c.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    const monthlyData = Object.keys(monthMap).map((key) => ({
      month: key,
      complaints: monthMap[key],
    }));

    // Stats summary
    const pending = complaints.filter((c) => c.status === "Pending").length;
    const resolved = complaints.filter((c) => c.status === "Resolved").length;
    const resolvedComplaints = complaints.filter(
      (c) => c.status === "Resolved"
    );
    const avgResolutionTime = resolvedComplaints.length
      ? (
          resolvedComplaints.reduce(
            (acc, c) => acc + (c.resolutionTime || 0),
            0
          ) / resolvedComplaints.length
        ).toFixed(1)
      : "-";

    res.status(200).json({
      complaints: formatted,
      stats: {
        total: complaints.length,
        pending,
        resolved,
        avgResolutionTime,
        categoryData,
        monthlyData,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// GET /api/admin-dashboard/faculty?department=CS
// Controller function
exports.getFacultyByDepartment = async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ message: "Department is required" });
    }

    const departmentMap = {
      CS: ["Computer Science", "CS", "Comp Sci"],
      ME: ["Mechanical Engineering", "ME"],
      EE: ["Electrical Engineering", "EE"],
      CE: ["Civil Engineering", "CE"],
      IME: ["Industrial and Manufacturing Engineering", "IME"],
    };

    const searchValues = departmentMap[department] || [department];

    const faculty = await User.find({
      role: "faculty",
      department: { $in: searchValues.map((d) => new RegExp(d, "i")) },
    }).select("fullName department email");

    console.log("Faculty found for:", searchValues, faculty.length);

    res.status(200).json({ faculty });
  } catch (err) {
    console.error("Error fetching faculty:", err);
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
};




// POST /api/admin-dashboard/assign-complaint/:complaintId
exports.assignComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { facultyId } = req.body;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    // Assign complaint
    complaint.assignedTo = facultyId;
    complaint.status = "In Progress";
    await complaint.save();

    // Create notification
    await Notification.create({
      recipient: facultyId,
      sender: req.user._id, // Admin assigning
      title: "New Complaint Assigned",
      message: `A complaint titled "${complaint.title}" has been assigned to you.`,
      type: "assigned_complaint",
      complaintId: complaint._id,
    });

    res.status(200).json({ message: "Complaint assigned successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to assign complaint" });
  }
};

//Resolve Complaint
exports.resolveComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    complaint.status = "Resolved";
    complaint.resolutionTime = Math.floor((Date.now() - complaint.createdAt) / (1000 * 60 * 60 * 24)); // in days
    await complaint.save();

    // Send notification to the student
    await Notification.create({
      recipient: complaint.user,
      sender: req.user._id,
      title: "Complaint Resolved",
      message: `Your complaint titled "${complaint.title}" has been marked as resolved.`,
      type: "resolved_complaint",
      complaintId: complaint._id,
    });

    res.status(200).json({ message: "Complaint marked as resolved successfully!" });
  } catch (err) {
    console.error("Error resolving complaint:", err);
    res.status(500).json({ message: "Failed to resolve complaint" });
  }
};
