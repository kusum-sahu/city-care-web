// routes/slot.routes.js
const router = require("express").Router();
const { getServiceSlots } = require("../controllers/slot.controller");

router.get("/:serviceId/slots", getServiceSlots);

module.exports = router;
