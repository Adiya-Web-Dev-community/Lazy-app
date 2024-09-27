const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: { type: Number },
    password: {
      type: String,
      required: true,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    claim: [
      {
        claimId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "claim",
        },
        amount: { type: Number },
        status: {
          type: String,
          enum: ["pending", "cancel", "confirm"],
          default: "pending",
        },
        isApproved: {
          type: Boolean,
          default: false,
        },
        bonusAmount:{type:Number}
      },
    ],
    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userModel);
module.exports = User;
