const express = require("express");
const fileuploader = require("express-fileupload");
const { connectToMongoDB } = require("./config/dbconnect");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routers/UserRouter");
const customerRouter = require("./routers/CustomerRouter");
const tailorRouter = require("./routers/TailorRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileuploader());
app.use("/uploads", express.static("uploads"));

connectToMongoDB();

app.use("/user", userRouter);
app.use("/customer", customerRouter);
app.use("/tailor", tailorRouter);

app.use((req, res) => {
  res.status(404).send({
    status: false,
    msg: "INVALID URL"
  });
});

const PORT = process.env.PORT || 2007;
app.listen(PORT, () => {
  console.log(`Server Started on : ${PORT}`);
});

module.exports = app;