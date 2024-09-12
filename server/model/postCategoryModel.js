const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostCategoryModel = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const PostCategory = mongoose.model("postCategory", PostCategoryModel);
module.exports = PostCategory;
