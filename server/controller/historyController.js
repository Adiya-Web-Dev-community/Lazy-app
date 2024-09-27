
const Transaction = require("../model/transaction");
const ClaimHistory = require("../model/claimhistory");

const gethistoryData = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.userId,
    }).lean();
    const claimHistories = await ClaimHistory.find({
      userId: req.userId,
    }).lean();

    const mergedData = [
      ...transactions.map((item) => ({ ...item, type: "transaction" })),
      ...claimHistories.map((item) => ({ ...item, type: "claim_history" })),
    ];

    mergedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return res.status(200).json({
      success: true,
      data: mergedData,
    });
  } catch (error) {
    console.error("Error fetching transaction and claim history:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching transaction and claim history.",
    });
  }
};
module.exports ={
    gethistoryData
}