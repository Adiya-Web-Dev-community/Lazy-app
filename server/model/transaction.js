const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: { type: String, default: "transaction" },
    status: {
      type: String,
      enum: ["pending", "cancel", "fail", "success"],
      default: "pending",
    },
    paymenttype: {
      type: String,
      enum: ["withdraw", "credit"],
      default: "withdraw",
    },
    paymentMode: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    remarks: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("transaction", TransactionSchema);
module.exports = Transaction;
