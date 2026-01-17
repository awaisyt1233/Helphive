const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect } = require("../Middleware/authMiddleware");
const { createComplaint, getUserComplaints, addComment, assignComplaint, resolveComplaint, getComplaintById, } = require("../controllers/complaintController");

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/complaints/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 10MB limit
});

// POST route for submission
router.post("/submit", protect, upload.array("images", 5), createComplaint);
router.get("/my-complaints", protect, getUserComplaints);
router.post("/:id/comment", protect, addComment);
router.put("/assign", protect, assignComplaint);
// Resolve a complaint
router.put("/:id/resolve", protect, resolveComplaint);
router.get("/:id", protect, getComplaintById);

module.exports = router;