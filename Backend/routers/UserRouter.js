const express = require("express");
const router = express.Router();
var {validateToken}=require("../config/validatetoken");

const userController = require("../controllers/UserController");

// Signup
router.post("/signup", userController.doUserSignup);

// Verify OTP
router.post("/verify-otp", userController.verifyOtp);

// Login
router.post("/login",validateToken,userController.doUserLogin);

module.exports = router;
