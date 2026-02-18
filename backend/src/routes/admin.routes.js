const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const {getAllUsersAdmin,toggleUserStatus,assignVendorToBooking ,verifyVendor,getAllVendors,completeBooking} = require("../controllers/admin.controller");

router.get("/users", verifyToken, allowRoles("Admin"), getAllUsersAdmin);
router.patch("/users/:userId/status",verifyToken,allowRoles("Admin"),toggleUserStatus);
router.get("/vendors",verifyToken,allowRoles("Admin"),getAllVendors);
router.patch("/vendors/:vendorId/verify",verifyToken,allowRoles("Admin"),verifyVendor);
router.patch("/bookings/:bookingId/assign-vendor",verifyToken,allowRoles("Admin"),assignVendorToBooking);
router.patch("/bookings/:bookingId/complete",verifyToken, allowRoles("Admin"),completeBooking);

module.exports = router;
