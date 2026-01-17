const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../Controllers/userController");
const { changePassword } = require("../Controllers/adminUserController");
const { protect } = require("../Middleware/authMiddleware");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;