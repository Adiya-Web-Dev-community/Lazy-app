const mongoose = require("mongoose");

const ClaimHistory = new mongoose.Schema(
  {
    claimId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "claim",
      required: true,
    },
    type: { type: String, default: "claim" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    action: [
      {
        status: {
          type: String,
          required: true,
        },
        updateBy: { type: String, required: true },
        date: { type: Date, default: Date.now },
        description: {
          type: String,
          required: true,
        },
      },
    ],

    amount: {
      type: Number,
    },
    bonusAmount:{type:Number}
  },
  {
    timestamps: true,
  }
);
ClaimHistory.index({ claimId: 1 });
ClaimHistory.index({ userId: 1 });
ClaimHistory.index({ "action.status": 1 });
const Claimhistory = mongoose.model("claim_history", ClaimHistory);
module.exports = Claimhistory;
