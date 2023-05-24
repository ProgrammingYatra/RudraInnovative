const userModel = require("../models/userModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const { name, email, password, phone } = data;

  if (!data) {
    return next(new ErrorHandler("Please Provide a Details", 400));
  }
  const user = await userModel.create({
    name,
    email,
    password,
    phone,
  });
  sendToken(user, 200, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(new Date().getTime()),
    httpOnly: true,
  });

  res.status(200).json({
    sucess: true,
    message: "Logged Out Successfully",
  });
});

//update password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).select("+password");
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(
      new ErrorHandler("Please Provide a Password to change it", 400)
    );
  }
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Old password", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated Successfully",
  });
});

// Profile Update

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  const { email, name, phone } = req.body;
  if (email) {
    user.email = email;
  }

  if (name) {
    user.name = name;
  }
  if (phone) {
    user.phone = phone;
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

// Delete My Profile
exports.deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.user._id);

  // Logout user after deleting profile
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: "Profile Deleted Successfully",
  });
});


exports.myProfile = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

//get user profile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

//get All user
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find({});

  return res.status(200).json({
    success: true,
    users,
  });
});

//forgot the password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
