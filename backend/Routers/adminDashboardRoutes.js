const express = require("express");
const router = express.Router();
const { getAllComplaints, getFacultyByDepartment, assignComplaint, resolveComplaint } = require("../Controllers/adminDashboardController");
const { protect } = require("../Middleware/authMiddleware");

// All routes here require login
router.get("/all-complaints", protect, getAllComplaints);
router.get("/faculty", protect, getFacultyByDepartment);
router.post("/assign-complaint/:complaintId", protect, assignComplaint);
router.patch("/resolve-complaint/:id", protect, resolveComplaint);
module.exports = router;
