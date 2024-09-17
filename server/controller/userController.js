const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const SendOTP = require("../email-templates/sendOtpMail");
const Alert = require("../email-templates/alert");

const UserRegister = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      mobile: mobile,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UserForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const min = 100000;
    const max = 999999;
    const OTP = Math.floor(Math.random() * (max - min + 1) + min);
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, { otp: OTP }, { new: true });

    SendOTP(email, OTP);

    return res
      .status(200)
      .json({ success: true, message: "OTP has been sent on you email" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UserVeriFyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp }).select("-password");
    if (!user) {
      // if user is not find another person try to log so user get email of alert msg on email
      Alert(email);
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    // token will generated and save and send on cokkies and api
    const token = jwt.sign(
      { _id: user._id, email: user?.email, role: user?.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
    return res
      .cookie("authorization", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ success: true, message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UserfogotVerifyOTP = async (req, res) => {
  const { email, newPassword, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp }).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "password changes successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UpdateUserProfile = async (req, res) => {
  const id = req.userId;
  const { name, mobile, image } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name and mobile,  fields are required",
      });
    }
    const response = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name,
          mobile: mobile,
          image: image,
        },
      },
      { new: true }
    ).select("-password");

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "User Not exists",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Update successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password credentials" });
    }
    const token = jwt.sign(
      { _id: user._id, email: user?.email, role: user?.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
    return res
      .cookie("authorization", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 240 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ success: true, message: "Login successful", token: token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .select("-otp");
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "user Not Found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  UserRegister,
  UserLogin,
  GetUserData,
  UserForgotPassword,

  UserfogotVerifyOTP,
  UpdateUserProfile,
};
