require("dotenv").config();

const db = require("../config/db");
const crypto = require("crypto");
const Razorpay = require("razorpay");

// 👇 IMPORTANT: Add this line
const bookingController = require("./booking.controller");

/* ================= RAZORPAY INIT ================= */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1234567890",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret_123456"
});


/* ================= CREATE ORDER ================= */

exports.createOrder = async (req, res) => {
  try {
    const { amount, booking_id } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + booking_id,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order,
      booking_id
    });

  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};


/* ================= VERIFY PAYMENT ================= */

exports.verifyPayment = (req, res) => {
  const {
    booking_id,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid payment signature" });
  }

  // ✅ Use bookingController instead of raw SQL here
  bookingController.markBookingPaid(
    booking_id,
    razorpay_payment_id,
    razorpay_signature,
    (err) => {
      if (err) {
        console.error("Payment update failed:", err);
        return res.status(500).json({ message: "Payment update failed" });
      }

      res.json({ success: true });
    }
  );
};
