const mongoose = require("mongoose");

const BuzzCategoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});
const BuzzCategory = mongoose.model("buzzcategory", BuzzCategoryModel);
module.exports = BuzzCategory;
