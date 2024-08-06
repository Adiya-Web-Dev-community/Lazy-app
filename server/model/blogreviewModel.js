const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogreviewModel = new mongoose.Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
    },
    isVerify: {
      type: String,
      default:false
    },
  },
  {
    timestamps: true,
  }
);

const BlogReview = mongoose.model("blogreview", blogreviewModel);
module.exports = BlogReview;
