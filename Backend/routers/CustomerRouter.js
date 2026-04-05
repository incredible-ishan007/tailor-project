var express = require("express");
var router = express.Router();


var customerController = require("../controllers/CustomerController");
var reviewController = require("../controllers/ReviewController");


router.post("/save", customerController.doSaveCustomer);
router.post("/update", customerController.doUpdateCustomer);
router.post("/search", customerController.doSearchCustomer);
router.post("/delete", customerController.doDeleteCustomer);


router.post("/publish-review", reviewController.doSaveReview);
router.post("/fetch-reviews", reviewController.doFetchTailorReviews);
router.post("/delete-review", reviewController.doDeleteReview);

module.exports = router;