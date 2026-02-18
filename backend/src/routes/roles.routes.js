const express = require("express");
const router = express.Router();
const { getAllRoles } = require("../controllers/role.controller");

// GET /api/roles
router.get("/", getAllRoles);

module.exports = router;
