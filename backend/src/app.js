const express = require("express");
const User = require("./routes/userRoute");
const ErrorHandler = require("./middlewares/error");
const app = express();

app.use(express.json());

app.use(User);

app.use(ErrorHandler);
module.exports = app;
