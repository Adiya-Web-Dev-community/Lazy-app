const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProsConsModel = new Schema(
  {
    productId:{
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    title: { type: String,      required: true  },
    pros: [{ type: String }],
    cons: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const ProsCons = mongoose.model("proscons", ProsConsModel);
module.exports = ProsCons;
