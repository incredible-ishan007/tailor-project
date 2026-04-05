var path = require("path");
require('dotenv').config()
var CustomerModel = require("../models/customer_profilepage");

// ================= SAVE CUSTOMER =================
function doSaveCustomer(req, resp) {

    if (!req.files || !req.files.profilepic) {
        req.body.picurl = "nopic.jpg";
    }
    else {
        let fileName = req.files.profilepic.name;
        let uploadPath = path.join(__dirname, "..", "uploads", fileName);

        req.files.profilepic.mv(uploadPath);
        req.body.picurl = fileName;
    }

    let objCustomer = new CustomerModel(req.body);

    objCustomer.save()
        .then((doc) => {
            resp.status(200).json({
                status: true,
                msg: "Customer Saved Successfully",
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


// ================= UPDATE CUSTOMER =================
function doUpdateCustomer(req, resp) {

    if (req.files && req.files.profilepic) {
        let fileName = req.files.profilepic.name;
        let uploadPath = path.join(__dirname, "..", "uploads", fileName);

        req.files.profilepic.mv(uploadPath);
        req.body.picurl = fileName;
    }

    CustomerModel.findOneAndUpdate(
        { emailid: req.body.emailid },
        { $set: req.body },
        { new: true }
    )
        .then((doc) => {
            if (!doc) {
                return resp.status(200).json({
                    status: false,
                    msg: "Customer Not Found"
                });
            }

            resp.status(200).json({
                status: true,
                msg: "Customer Updated Successfully",
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


// ================= SEARCH CUSTOMER =================
function doSearchCustomer(req, resp) {

    CustomerModel.findOne({ emailid: req.body.emailid })
        .then((doc) => {
            if (!doc) {
                return resp.status(200).json({
                    status: false,
                    msg: "Customer Not Found"
                });
            }

            resp.status(200).json({
                status: true,
                customer: doc
            });
        })
        .catch((err) => {
            resp.status(200).json({
                status: false,
                msg: err.message
            });
        });
}


// ================= DELETE CUSTOMER =================
function doDeleteCustomer(req, resp) {

    CustomerModel.findOneAndDelete({ emailid: req.body.emailid })
        .then((doc) => {
            resp.status(200).json({
                status: true,
                msg: "Customer Deleted"
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
    doSaveCustomer,
    doUpdateCustomer,
    doSearchCustomer,
    doDeleteCustomer
};