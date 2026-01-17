const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// SIGNUP LOGIC
exports.signup = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, password, confirmPassword } =
      req.body;

    // 1️⃣ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create and Save User
    const newUser = new User({
      fullName,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    await newUser.save();

    // 5️⃣ Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 6️⃣ Email Content
    const mailOptions = {
      from: `"Help Hive " <${process.env.EMAIL_USER}>`,
      to: newUser.email,
      subject: "Welcome to HelpHive - Complaint Management System 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome to HelpHive, ${newUser.fullName} 👋</h2>
          <p>Thank you for registering with <strong>HelpHive</strong> – your university's official complaint management platform.</p>
          <p>You can now log in, submit complaints, and track their resolution efficiently.</p>
          <br/>
          <p>🚀 <strong>Start here:</strong> <a href="http://localhost:5173/login" style="color: #1a73e8;">Login to HelpHive</a></p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The HelpHive Team</strong></p>
        </div>
      `,
    };

    // 7️⃣ Send Email
    await transporter.sendMail(mailOptions);

    // 8️⃣ Response
    res.status(201).json({
      message: "User registered successfully and welcome email sent! ✅",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// LOGIN LOGIC
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // ✅ include user info in the response
    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: "Welcome back!",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPLOAD PROFILE PICTURE LOGIC
exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Store the path in the database
    const filePath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: filePath },
      { new: true }
    );

    res.status(200).json({
      message: "Image uploaded successfully",
      profilePicture: filePath,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image" });
  }
};

// 1. Fetch User Data
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// 2. Update Profile & Generate Student ID
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, department } = req.body;
    const user = await User.findById(req.user.id);

    let updateData = { fullName, email, mobileNumber };

    // ID Generation Logic (Only if department is selected for the first time)
    if (!user.isDepartmentSet && department) {
      const deptCode = department
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      const year = new Date().getFullYear();
      const random = Math.floor(1000 + Math.random() * 9000);

      updateData.department = department;
      updateData.isDepartmentSet = true;
      updateData.studentId = `${deptCode}-${year}-${random}`;
      updateData.joinDate = new Date().toLocaleDateString();
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// 3. Change Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Password update failed" });
  }
};

// @desc Forgot Password - Send Reset Email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // 3️⃣ Create reset URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // 4️⃣ Setup email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"HelpHive Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request 🔒",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Password Reset Request</h2>
          <p>Hello ${user.fullName},</p>
          <p>You requested to reset your password. Click the link below to reset it. This link expires in 1 minute.</p>
          <p>🔗 <a href="${resetUrl}" style="color: #1a73e8;">Reset Password</a></p>
          <br/>
          <p>If you did not request this, ignore this email.</p>
          <p>Best regards,<br/>HelpHive Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email!" });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Reset Password - Set New Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token and find user
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Remove reset token and expiry
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};