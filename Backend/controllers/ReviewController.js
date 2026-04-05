require('dotenv').config()
const ReviewModel = require("../models/review_model"); 


function doSaveReview(req, resp) {
    
    let objReview = new ReviewModel(req.body);

    objReview.save()
        .then((doc) => {
            resp.status(200).json({
                status: true,
                msg: "Review Published Successfully",
                doc: doc
            });
        })
        .catch((err) => {
            resp.status(200).json({
                status: false,
                msg: err.message
            });
        });
}


function doFetchTailorReviews(req, resp) {
    
    ReviewModel.find({ tailorContact: req.body.tailorContact })
        .populate("userId", "fullName email") 
        .then((docs) => {
            if (!docs || docs.length === 0) {
                return resp.status(200).json({
                    status: false,
                    msg: "No reviews found for this tailor"
                });
            }

            resp.status(200).json({
                status: true,
                reviews: docs
            });
        })
        .catch((err) => {
            resp.status(200).json({
                status: false,
                msg: err.message
            });
        });
}


function doDeleteReview(req, resp) {
   
    ReviewModel.findByIdAndDelete(req.body.reviewId)
        .then((doc) => {
            resp.status(200).json({
                status: true,
                msg: "Review Deleted Successfully"
            });
        })
        .catch((err) => {
            resp.status(200).json({
                status: false,
                msg: err.message
            });
        });
}

module.exports = {
    doSaveReview,
    doFetchTailorReviews,
    doDeleteReview
};