const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  // Who receives the notification
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Who triggered the action (Optional, but helpful for "Admin assigned X to you")
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  title: { type: String, required: true },
  message: { type: String, required: true },

  // ✅ Expanded enum list to include all workflow notification types
  type: {
    type: String,
    enum: [
      "new_complaint",        // when a user submits a new complaint
      "assignment",           // when complaint assigned to faculty
      "assigned_complaint",   // added for your admin assignment logic
      "resolution_request",   // when faculty requests resolution
      "faculty_request_resolution",
      "resolved_complaint",             // when complaint is resolved
      "comment",              // when someone comments on complaint
    ],
    default: "new_complaint",
  },

  complaintId: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint" },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
