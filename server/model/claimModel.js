const mongoose = require("mongoose");

const ClaimModel = new mongoose.Schema(
  {
    name: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productname: {
      type: String,
      required: true,
    },
    dateOfOrder: {
      type: Date,
      required: true,
    },
    orderid: {
      type: String,
    },
    bonusAmount: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["confirm", "pending", "cancel"],
    },

    type: { type: String },
    orderamount: { type: Number, required: true },
    invoice: { type: String },
    isApproved: { type: Boolean, default: false },
    remarks: { type: String },
  },
  {
    timestamps: true,
  }
);

const Claim = mongoose.model("claim", ClaimModel);
module.exports = Claim;
