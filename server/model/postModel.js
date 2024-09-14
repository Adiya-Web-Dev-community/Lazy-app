const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const PostModel = new Schema(
  {
    //   title: { type: String, required: true },
    content: { type: String, required: true },
    image_url: { type: String }, // Optional image URL
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true }, // Reference to the User collection
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Stores user IDs who liked the post
    comments: [CommentsSchema],
    shares: { type: Number, default: 0 }, // Share count
    category: { type: String },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Stores user IDs who saved the post
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostModel);
module.exports = Post;

// module.exports = mongoose.model("Post", PostSchema);
