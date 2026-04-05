var path = require("path");
var UserSignup = require("../models/user_signup");
const transporter = require("../config/mailer");
const generateOTP = require("../utils/generateOtp");
const jwt = require('jsonwebtoken');
// --- NEW: Import the connection helper ---
const { connectToMongoDB } = require("../config/dbconnect"); 
require('dotenv').config();

async function doUserSignup(req, resp) {
    try {
        // --- NEW: Ensure DB is connected before query ---
        await connectToMongoDB();

        const { fullName, email, phone, password, role } = req.body;
        const cleanEmail = email.trim().toLowerCase();

        const existingUser = await UserSignup.findOne({ email: cleanEmail });

        if (existingUser) {
            return resp.status(400).json({
                status: false,
                msg: "User already exists"
            });
        }

        const otp = generateOTP();
        let jtoken = jwt.sign({ email: cleanEmail }, process.env.sec_key, { expiresIn: "1m" });
        console.log(jtoken);

        let objUserRef = new UserSignup({
            fullName,
            email: cleanEmail,   
            phone,
            password,
            role,
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000,
        });

        await objUserRef.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: cleanEmail,
            subject: "OTP Verification",
            html: `<h2>Your OTP is: ${otp}</h2>
                   <p>Valid for 10 minutes</p>`
        });

        resp.status(200).json({
            status: true,
            msg: "OTP sent to your email",
            token: jtoken
        });

    } catch (err) {
        resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

async function verifyOtp(req, resp) {
    try {
        // --- NEW: Ensure DB is connected before query ---
        await connectToMongoDB();

        const { email, otp } = req.body;
        const cleanEmail = email.trim().toLowerCase();

        const user = await UserSignup.findOne({ email: cleanEmail });

        if (!user) {
            return resp.status(400).json({
                status: false,
                msg: "User not found"
            });
        }

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return resp.status(400).json({
                status: false,
                msg: "Invalid or expired OTP"
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        resp.status(200).json({
            status: true,
            msg: "Account verified successfully"
        });

    } catch (err) {
        resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

async function doUserLogin(req, resp) {
    try {
        // --- NEW: Ensure DB is connected before query ---
        await connectToMongoDB();

        const { email, password } = req.body;
        const cleanEmail = email.trim().toLowerCase();

        const user = await UserSignup.findOne({ email: cleanEmail });

        if (!user) {
            return resp.status(400).json({
                status: false,
                msg: "User not found"
            });
        }

        if (!user.isVerified) {
            return resp.status(400).json({
                status: false,
                msg: "Please verify your email first"
            });
        }

        if (user.password !== password) {
            return resp.status(400).json({
                status: false,
                msg: "Invalid password"
            });
        }

        resp.status(200).json({
            status: true,
            msg: "Login successful",
            user: user
        });

    } catch (err) {
        resp.status(500).json({
            status: false,
            msg: err.message
        });
    }
}

module.exports = { doUserSignup, doUserLogin, verifyOtp };