const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostModel = new Schema(
  {
    //   title: { type: String, required: true },
    content: { type: String, required: true },
    image_url: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostModel);
module.exports = Post;
