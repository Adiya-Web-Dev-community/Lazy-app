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
    image_url: [{ type: String }], 
    video_url: { type: String }, 
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true }, 
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], 
    comments: [CommentsSchema],
    shares: { type: Number, default: 0 }, // Share count
    category: { type: String },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], 
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostModel);
module.exports = Post;

// module.exports = mongoose.model("Post", PostSchema);
