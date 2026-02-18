const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

// DB connection test
router.get("/db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Database connected successfully 🎉",
    });
  });
});

// 🔐 Protected route
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected route 🎉",
    user: req.user,
  });
});

router.get(
  "/admin-only",
  verifyToken,
  allowRoles("Admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin 👑",
      user: req.user,
    });
  }
);

module.exports = router;
