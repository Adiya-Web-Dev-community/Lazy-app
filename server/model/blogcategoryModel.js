const mongoose = require("mongoose");

const BlogCategoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const BlogCategory = mongoose.model("blogcategory", BlogCategoryModel);
module.exports = BlogCategory;
