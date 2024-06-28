const express = require('express');
const router = express.Router();
const {accountMiddleware,isAdmin,isUser}=require('../middleware/uservalidate');
const { Register,Login,GetData} = require('../controller/adminController');


router.post('/register', Register);
router.post("/login",Login);
router.get("/get-myself",isAdmin,GetData);


module.exports = router;