const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: {
      type: String,
      required: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    images: [{ type: String }], // Array to store multiple file paths
    status: { type: String, default: "Pending" }, // Admin-controlled status
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assigned faculty/staff

    // ✅ NEW: Track faculty action (request admin resolution)
    facultyAction: {
      type: String,
      enum: ["", "Requested Resolution"], // "" = no action yet
      default: "",
    },

    createdAt: { type: Date, default: Date.now },
    comments: [
      {
        text: { type: String, required: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        senderName: { type: String },
        role: {
          type: String,
          enum: [
            "Student",
            "Faculty",
            "Admin",
            "Staff",
            "student",
            "faculty",
            "admin",
            "staff",
          ],
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
