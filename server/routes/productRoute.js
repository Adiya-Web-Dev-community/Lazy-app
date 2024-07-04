const express = require('express');
const router = express.Router();
const {isAdmin,isUser}=require('../middleware/uservalidate');





module.exports = router;