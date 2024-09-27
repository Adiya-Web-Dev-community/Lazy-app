const express = require("express");
const router = express.Router();
const { isAdmin,isUser } = require("../middleware/uservalidate");
const {
    gethistoryData
} = require("../controller/historyController");

router.get("/",isUser,gethistoryData);

module.exports = router;
