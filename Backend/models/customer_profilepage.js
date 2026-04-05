const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerDesign = {
  emailid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  gender: { type: String, required: true },
  picurl: { type: String, default: "nopic.jpg" }
};

const CustomerSchemaObject = new Schema(CustomerDesign, {
  versionKey: false
});

const CustomerModel = mongoose.model("customerProfile", CustomerSchemaObject);

module.exports = CustomerModel;
