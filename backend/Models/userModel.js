// Keep this as your ONLY user model
const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "admin", "faculty"],
      default: "student",
    },
    profilePicture: { type: String, default: "" },

    department: { type: String, default: "" },
    isDepartmentSet: { type: Boolean, default: false },
    studentId: { type: String, unique: true, sparse: true }, // sparse allows nulls for admin/staff
    resetAttempts: {
      type: Number,
      default: 0,
    },
    lastResetAttempt: {
      type: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    joinDate: { type: Date, default: Date.now }, // Changed to Date
  },
  { timestamps: true }
);

userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to user
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 10 min expiry for testing
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
