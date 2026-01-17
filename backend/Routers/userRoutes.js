const express = require("express");
const router = express.Router();
const { signup, login, updateProfilePicture, getProfile, updateProfile, changePassword, forgotPassword, resetPassword } = require("../Controllers/userController");
const { validateSignup,validateLogin  } = require("../Middleware/validate");
const upload = require("../Middleware/uploadMiddleware");
const { protect } = require("../Middleware/authMiddleware");



router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);


router.post("/profile/upload", protect, upload.single("image"), updateProfilePicture);
router.get("/profile", protect, getProfile);
router.put("/profile/update", protect, updateProfile);
router.post("/profile/upload", protect, upload.single("image"), updateProfilePicture);
router.put("/profile/password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;