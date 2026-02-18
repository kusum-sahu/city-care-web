// const router = require("express").Router();
// const {sendOtp,verifyOtp,login} = require("../controllers/auth.controller");

// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
// router.post("/login", login);

// module.exports = router;


const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
