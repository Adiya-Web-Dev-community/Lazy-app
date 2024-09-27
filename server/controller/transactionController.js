const Transaction=require("../model/transaction");

const createtransaction=async(req,res)=>{
    try {
const data = req.body;
const newTransaction = new Transaction({
  ...data,
  userId: req.userId,
});
        const savedTransaction = await newTransaction.save();
        res.status(201).json({
          success: true,
          message: "Transaction created successfully",
          transaction: savedTransaction,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create transaction",
          error: error.message,
        });
      }
}

module.exports ={
    createtransaction
}