var express = require("express");
var fileuploader = require("express-fileupload");
var { connectToMongoDB } = require("./config/dbconnect");
const cors = require('cors');
require("dotenv").config();


var userRouter = require("./routers/UserRouter");
var customerRouter = require("./routers/CustomerRouter");
var tailorRouter = require("./routers/TailorRouter"); 

var app = express();


app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(fileuploader());
app.use(cors());


connectToMongoDB();


app.use("/user", userRouter);
app.use("/customer", customerRouter);
app.use("/tailor", tailorRouter); 

app.listen(2007, () => {
    console.log("Server Started on : 2007");
});


app.use((req, res) => {
    res.status(404).send({
        status: false,
        msg: "INVALID URL"
    });
});