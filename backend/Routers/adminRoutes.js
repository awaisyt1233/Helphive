const express = require("express");
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require("../Controllers/adminController");
const { protect: auth } = require("../Middleware/authMiddleware");
const isAdmin = require("../Middleware/isAdmin"); 

// All routes here require Admin privileges
router.get("/users", auth, isAdmin, getAllUsers);
router.put("/users/:id", auth, isAdmin, updateUser);
router.delete("/users/:id", auth, isAdmin, deleteUser);

module.exports = router;