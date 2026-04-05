const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SignupDesign = {
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },

 
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false }
};

const SignupSchemaObject = new Schema(SignupDesign, {
  versionKey: false
});

const SignupModel = mongoose.model("userSignup", SignupSchemaObject);

module.exports = SignupModel;
