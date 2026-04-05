const mongoose = require("mongoose");

const TailorSchema = new mongoose.Schema({
  emailid: { type: String, required: true},
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  aadharno: { type: String, required: true },
  dob: { type: String },
  gender: { type: String },


  category: { type: [String], required: true },
  speciality: { type: String, required: true },
  website: { type: String },
  since: { type: String },
  worktype: { type: String, required: true },

  shopaddr: { type: String },
  shopcity: { type: String },
  otherinfo: { type: String },

  profilepic: { type: String, default: "nopic.jpg" },
  aadharcard: { type: String, default: "noaadhar.jpg" }
}, { versionKey: false });

module.exports = mongoose.model("tailorProfile", TailorSchema);