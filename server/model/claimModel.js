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
    status: { type: String, default: "pending", enum: ["claimed", "pending"] },
    orderamount: { type: Number },
    invoice: { type: String },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Claim = mongoose.model("claim", ClaimModel);
module.exports = Claim;
