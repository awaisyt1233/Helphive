const User = require("../Models/userModel");
const Complaint = require("../Models/Complaint");
const bcrypt = require("bcryptjs");

// @desc    Get user profile & stats
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    const resolvedCount = await Complaint.countDocuments({ 
        resolvedBy: req.user.id, 
        status: "Resolved" 
    });

    res.json({
      user,
      stats: {
        resolvedCount: resolvedCount || 0,
        successRate: "92%" 
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update Personal Info
exports.updateProfile = async (req, res) => {
  try {
    // UPDATED: Destructure fullName from request body
    const { fullName, email, phone } = req.body;
    
    const user = await User.findById(req.user.id);
    if (user) {
      // UPDATED: Use fullName property
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.phone = phone || user.phone;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// @desc    Change Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 1. Explicitly fetch password (important if your model hides it)
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    // 3. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update ONLY the password field
    // This bypasses the validation issues with 'studentId'
    await User.findByIdAndUpdate(req.user.id, { 
      $set: { password: hashedNewPassword } 
    });

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error); // Check your terminal for the real error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // This creates the string "/uploads/filename.jpg"
    const imagePath = `/uploads/${req.file.filename}`;

    const user = await User.findById(req.user.id);
    user.profilePicture = imagePath; 
    await user.save();

    res.json({ 
      message: "Profile picture updated", 
      imageUrl: imagePath  // This is what the frontend uses
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile picture" });
  }
};