const express = require("express");
const router = express.Router();
const { isAdmin,isUser } = require("../middleware/uservalidate");
const {
    createtransaction
} = require("../controller/transactionController");

router.post("/",isUser,createtransaction);

module.exports = router;
