const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload");

const vendorController = require("../controllers/vendor.controller");
const bookingController = require("../controllers/booking.controller"); 
const { uploadDocuments, getVendorProfileStatus } = vendorController;

router.post("/upload-docs",verifyToken,allowRoles("Vendor"), upload.fields([{ name: "aadhaar_doc" },{ name: "pan_doc" },{ name: "license_doc" },{ name: "profile_img" },]),uploadDocuments);
router.get("/profile-status", verifyToken, allowRoles("Vendor"), getVendorProfileStatus);
router.get("/earnings/:vendorId", vendorController.getVendorEarnings);
router.put("/toggle-online", vendorController.toggleOnlineStatus);
// router.get("/bookings/:vendorId", bookingController.getVendorBookings);
router.get("/bookings", verifyToken, allowRoles("Vendor"), bookingController.getVendorBookings);


module.exports = router;