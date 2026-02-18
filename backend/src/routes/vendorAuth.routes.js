const router = require("express").Router();
const { registerVendor } = require("../controllers/vendorAuth.controller");

router.post("/register", registerVendor);

module.exports = router;