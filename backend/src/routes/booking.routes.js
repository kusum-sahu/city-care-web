const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const verifyToken = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

router.post("/bookings/create", bookingController.createBooking);
router.post("/bookings/start", bookingController.startJob);
router.post("/bookings/complete", bookingController.completeJob);
router.post("/bookings/cancel", bookingController.cancelBooking);

router.put(
  "/bookings/:bookingId/accept",
  verifyToken,
  allowRoles("Vendor"),
  bookingController.acceptBooking
);

router.put(
  "/bookings/:id/decline",
  verifyToken,
  allowRoles("Vendor"),
  bookingController.declineBooking
);

module.exports = router;
