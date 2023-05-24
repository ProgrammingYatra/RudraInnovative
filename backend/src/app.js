const express = require("express");
const User = require("./routes/userRoute");
const cookie=require("cookie-parser")
const ErrorHandler = require("./middlewares/error");
const app = express();

app.use(cookie())
app.use(express.json());

app.use("/api/v1",User);

app.use(ErrorHandler);
module.exports = app;
