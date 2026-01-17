const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../Controllers/analyticsController");
const {protect: auth} = require("../Middleware/authMiddleware");
const isAdmin = require("../Middleware/isAdmin");

// Only Admins should see the stats
router.get("/stats", auth, isAdmin, getDashboardStats);

module.exports = router;