const express = require("express");
const router = express.Router();
const { isAdmin,isUser } = require("../middleware/uservalidate");
const {
    createtransaction,
    updateTransaction,
    getAlltransaction,
    getTransactionByuserId,
    getTransactionByuserIdforAdmin,
    getSingletransaction,
    getSingletransactionadmin
} = require("../controller/transactionController");

router.post("/",isUser,createtransaction);
router.put("/:id",isAdmin,updateTransaction);
router.get("/",isAdmin,getAlltransaction);
router.get("/:id",isAdmin)
router.get("/user/all",isUser,getTransactionByuserId)
router.get("/user/:userId",getTransactionByuserIdforAdmin);
router.get("/single/:id",isUser,getSingletransaction)
router.get("/single/admin/:id",isAdmin,getSingletransactionadmin)

module.exports = router;
