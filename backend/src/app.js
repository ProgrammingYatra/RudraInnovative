const express = require("express");
const User = require("./routes/userRoute");
const cookie=require("cookie-parser")
const ErrorHandler = require("./middlewares/error");
const cors=require("cors")
const app = express();

app.use(cookie())
app.use(express.json());
app.use(cors())

app.use("/api/v1",User);

app.use(ErrorHandler);
module.exports = app;
