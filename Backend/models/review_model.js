const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewDesign = {
  tailorContact: { type: String, required: true },
  userId: { type: String }, 
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
};

const ReviewSchemaObject = new Schema(ReviewDesign, {
  versionKey: false 
});

const ReviewModel = mongoose.model("tailorReview", ReviewSchemaObject);
module.exports = ReviewModel;