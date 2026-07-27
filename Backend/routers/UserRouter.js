const express = require("express");
const router = express.Router();
var { validateToken } = require("../config/validatetoken");

const userController = require("../controllers/UserController");

router.post("/signup", userController.doUserSignup);
router.post("/verify-otp", userController.verifyOtp);
router.post("/login", userController.doUserLogin);

module.exports = router;