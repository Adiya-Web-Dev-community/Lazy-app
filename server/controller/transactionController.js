const Transaction=require("../model/transaction");

const createtransaction = async (req, res) => {
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
};

const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const updatedData = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAlltransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("userId");
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getSingletransaction = async (req, res) => {
  try {
    const {id}=req.params
    const transactions = await Transaction.findById(id).populate("userId");
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getSingletransactionadmin = async (req, res) => {
  try {
    const {id}=req.params
    const transactions = await Transaction.findById(id).populate("userId");
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getTransactionByuserId = async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ userId: userId }).populate(
      "userId"
    );

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getTransactionByuserIdforAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ userId: userId }).populate(
      "userId"
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports ={
    createtransaction,
    updateTransaction,
    getAlltransaction,
    getTransactionByuserId,
    getTransactionByuserIdforAdmin,
    getSingletransaction,
    getSingletransactionadmin
}