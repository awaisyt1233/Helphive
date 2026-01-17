const express = require("express");
const router = express.Router();
const { 
  getNotifications, 
  markAsRead, 
  markAllRead, 
  deleteNotification 
} = require("../Controllers/notificationController");
const {protect} = require("../Middleware/authMiddleware"); 

router.get("/", protect, getNotifications);
router.patch("/read-all", protect, markAllRead);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteNotification); // <--- DELETE ROUTE

module.exports = router;