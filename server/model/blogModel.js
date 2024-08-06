const mongoose = require("mongoose");
const BrandSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  link: { type: String },
});

const blogModel = new mongoose.Schema(
  {
    thumnail: [
      {
        type: String,
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    brand: [BrandSchema],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogModel);
module.exports = Blog;
