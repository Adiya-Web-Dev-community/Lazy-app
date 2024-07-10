const express = require('express');
const router = express.Router();
const {accountMiddleware,isUser}=require('../middleware/uservalidate');
const { UserRegister,UserLogin,GetUserData} = require('../controller/userController');
const { GetCategory } = require("../controller/categoryController");


router.post('/register', UserRegister);
router.post("/login",UserLogin);
router.get("/get-myself",isUser,GetUserData);
router.get("/category", GetCategory);
module.exports = router;