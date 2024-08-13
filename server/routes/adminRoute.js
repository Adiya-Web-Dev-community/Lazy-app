const express = require('express');
const router = express.Router();
const {accountMiddleware,isAdmin,isUser}=require('../middleware/uservalidate');
const { Register,Login,GetData,UpdateProfile,ForGetPassword,VeriFyOTP,fogotVerifyOTP} = require('../controller/adminController');


router.post('/register', Register);
router.post("/login",Login);
router.get("/get-myself",isAdmin,GetData);
router.put("/update-profile",isAdmin,UpdateProfile);
router.post("/forgetpassword",ForGetPassword);
router.post("/verifyotp",VeriFyOTP)
router.post("/forgot/verifyotp",fogotVerifyOTP)

module.exports = router;