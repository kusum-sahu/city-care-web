const router = require("express").Router();
const { getServicesByType,getServiceDetails} = require("../controllers/service.controller");
const { getServiceSlots } = require("../controllers/slot.controller");

// 🔥 SPECIFIC ROUTES FIRST
router.get("/details/:id", getServiceDetails);
router.get("/:serviceId/slots", getServiceSlots);

// 🔥 GENERIC ROUTE LAST
router.get("/:type", getServicesByType);

module.exports = router;

