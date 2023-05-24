const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Your  Name"],
    validate: {
      validator: function (name) {
        return /^[a-zA-Z\. ]*$/.test(name);
      },
      message: "Please Provide a Valid Name",
    },
  },
  phone: {
    type: Number,
    required: [true, "Enter Your  Number"],
    validate: {
      validator: function (Mobile) {
        return /^[6-9]\d{9}$/.test(Mobile);
      },
      message: "Please Provide a Indian Phone No.",
    },
  },
  email: {
    type: String,
    required: [true, "Enter your Email"],
    unique: [true, "Email Already Registered"],
    validate: {
      validator: function (email) {
        return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(
          email
        );
      },
      message: "Please Provide a Valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Enter your Password"],
    minLength: [6, "Enter Minimum Length of 6 Character"],
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
