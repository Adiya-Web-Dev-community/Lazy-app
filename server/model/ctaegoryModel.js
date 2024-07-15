const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Category = mongoose.model("category", categoryModel);
module.exports = Category;
