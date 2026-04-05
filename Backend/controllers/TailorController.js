const path = require("path");   
const fs = require("fs");
const TailorModel = require("../models/Tailor_profilepage");
const Tesseract = require("tesseract.js");
const cloudinary = require("cloudinary").v2;
require('dotenv').config()

async function doExtractAadhar(req, resp) {
    try {
        if (!req.files || !req.files.aadharcard) {
            return resp.json({ status: false, msg: "No image uploaded" });
        }

        const aadharFile = req.files.aadharcard;
        const result = await Tesseract.recognize(aadharFile.data, 'eng');
        const text = result.data.text;

        const aadharMatch = text.match(/\d{4}\s\d{4}\s\d{4}/);
        const dobMatch = text.match(/\d{2}\/\d{2}\/\d{4}/);

        resp.json({
            status: true,
            aadhaarno: aadharMatch ? aadharMatch[0].replace(/\s/g, "") : "",
            dob: dobMatch ? dobMatch[0] : "",
            gender: text.toLowerCase().includes("female") ? "Female" : "Male"
        });

    } catch (err) {
        resp.json({ status: false, msg: "AI Error: " + err.message });
    }
}

async function doSaveTailor(req, resp) {
    try {
        const data = req.body;
        let profileName = "nopic.jpg";
        let aadharName = "noaadhar.jpg";

        if (req.files && req.files.profilepic) {
            profileName = Date.now() + "_" + req.files.profilepic.name;

            let fullPath = path.join(__dirname, "../uploads/", profileName);
            await req.files.profilepic.mv(fullPath);

            let result = await cloudinary.uploader.upload(fullPath);
            profileName = result.secure_url;

            fs.unlinkSync(fullPath);
        }

        if (req.files && req.files.aadharcard) {
            aadharName = Date.now() + "_" + req.files.aadharcard.name;

            let fullPath = path.join(__dirname, "../uploads/", aadharName);
            await req.files.aadharcard.mv(fullPath);

            let result = await cloudinary.uploader.upload(fullPath);
            aadharName = result.secure_url;

            fs.unlinkSync(fullPath);
        }

        const newTailor = new TailorModel({
            ...data,
            category: JSON.parse(data.category),
            profilepic: profileName,
            aadharcard: aadharName
        });

        await newTailor.save();
        resp.json({ status: true, msg: "Profile saved!" });

    } catch (err) {
        resp.json({ status: false, msg: "Database Error: " + err.message });
    }
}

async function doGetUniqueFilters(req, resp) {
    try {
        const cities = await TailorModel.distinct("city");

        const rawSpecs = await TailorModel.distinct("speciality");
        let allSpecs = [];

        for (let i = 0; i < rawSpecs.length; i++) {
            let s = rawSpecs[i];

            if (s) {
                let parts = s.split(",");

                for (let j = 0; j < parts.length; j++) {
                    allSpecs.push(parts[j].trim());
                }
            }
        }

        let specialities = [...new Set(allSpecs)];
        specialities.sort();

        resp.json({
            status: true,
            cities: cities.sort(),
            specialities
        });

    } catch (err) {
        resp.json({ status: false, msg: "Filter Error: " + err.message });
    }
}

async function doSearchTailors(req, resp) {
    try {
        const { city, category, speciality } = req.body;
        let query = {};

        if (city && city.trim() !== "") {
            query.city = city;
        }

        if (category && category.trim() !== "") {
            query.category = category;
        }

        if (speciality && speciality.trim() !== "") {
            query.speciality = { $regex: speciality, $options: "i" };
        }

        const results = await TailorModel.find(query);
        resp.json({ status: true, results });

    } catch (err) {
        resp.json({ status: false, msg: "Search Error: " + err.message });
    }
}

module.exports = {
    doSaveTailor,
    doExtractAadhar,
    doGetUniqueFilters,
    doSearchTailors
};