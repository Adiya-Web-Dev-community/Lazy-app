const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostModel = new Schema({
  //   title: { type: String, required: true },
  content: { type: String, required: true },
  image_url: { type: String }, // Optional image URL
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User collection
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostModel);
module.exports = Post;
