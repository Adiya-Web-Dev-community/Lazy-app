const mongoose = require("mongoose");

const BuzzfeedPost = new mongoose.Schema({
  content: { type: String, required: true },
  like: [
    {
      userId: { type: String },
    },
  ],
  comment: [{ userId: { type: String }, message: { type: String } }],
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const BuzzPost = mongoose.model("buzzpost", BuzzfeedPost);
module.exports = BuzzPost;
