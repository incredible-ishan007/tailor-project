const express = require("express");
const router = express.Router();
const TailorCtrl = require("../controllers/TailorController");


router.post("/extract-aadhar", TailorCtrl.doExtractAadhar);
router.post("/save", TailorCtrl.doSaveTailor);


router.get("/get-filters", TailorCtrl.doGetUniqueFilters);


router.post("/search-tailors", TailorCtrl.doSearchTailors);

module.exports = router;