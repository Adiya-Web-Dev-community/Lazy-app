const express = require("express");
const router = express.Router();
const { accountMiddleware, isUser } = require("../middleware/uservalidate");
const {
  UserRegister,
  UserLogin,
  GetUserData,
  UserForgotPassword,
  UserfogotVerifyOTP,
  UpdateUserProfile,
  UserUpdatePassword,
} = require("../controller/userController");
const { GetCategory } = require("../controller/categoryController");

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/get-myself", isUser, GetUserData);
router.get("/category", GetCategory);

//update user Profile
router.put("/update-profile", isUser, UpdateUserProfile);
//forgate password 1 stage passing email verfication
router.post("/forgetpassword", UserForgotPassword);
//forgate password 2 stage passing email, new password
router.post("/forgot/verifyotp", UserfogotVerifyOTP);
//update or reset password while login
router.post("/reset-password", isUser, UserUpdatePassword);

module.exports = router;
