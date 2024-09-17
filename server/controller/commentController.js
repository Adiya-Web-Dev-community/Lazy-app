const Post = require("../model/postModel");

const creatcommentOnPost = async (req, res) => {
  const userId = req.userId; // Get userId from middleware
  const postId = req.params.id; // Get postId from the request parameters
  const commentText = req.body.comment; // Get commentText from the request parameters
  try {
    const newComment = {
      user_id: userId,
      comment: commentText,
    };

    if (!commentText) {
      return res.status(400).json({ message: "Comment is required." });
    }

    const response = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment } },
      { new: true }
    );
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateComment = async (req, res) => {
  const postId = req.params.id; // Post ID from URL parameters
  const commentId = req.params.commentId; // Comment ID from URL parameters
  const updatedCommentText = req.body.comment; // New comment text from request body

  try {
    const post = await Post.findOneAndUpdate(
      { _id: postId, "comments._id": commentId }, // Find the post and the comment by its ID
      { $set: { "comments.$.comment": updatedCommentText } }, // Update the comment field
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post or Comment not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const postId = req.params.id; // Post ID from URL parameters
  const commentId = req.params.commentId; // Comment ID from URL parameters

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } }, // Remove the comment that matches the commentId
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post or Comment not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  creatcommentOnPost,
  updateComment,
  deleteComment,
};
