const express = require("express");
const router = express.Router();
const { getAssignedComplaints, updateComplaintStatus, informAdminResolution } = require("../Controllers/facultyController");
const { protect } = require("../Middleware/authMiddleware"); // Assuming you have this

// All routes here require the user to be logged in
router.get("/assigned-complaints", protect, getAssignedComplaints);
router.put("/update-status/:id", protect, updateComplaintStatus);
router.put("/inform-admin-resolution/:id", protect, informAdminResolution);

module.exports = router;