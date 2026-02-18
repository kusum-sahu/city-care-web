const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { verifyPayment } = require("../controllers/payment.controller");

router.post("/create-order", paymentController.createOrder);
router.post("/verify", verifyPayment);

module.exports = router;
