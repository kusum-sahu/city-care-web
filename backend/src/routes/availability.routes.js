const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availability.controller");

// GET /api/vendor/next-available/:vendorId/:serviceId
router.get(
  "/vendor/next-available/:vendorId/:serviceId",
  availabilityController.getNextAvailable
);

module.exports = router;
