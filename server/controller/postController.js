const Post = require("../model/postModel");

const createPost = async (req, res) => {
  const { user_id, content, image_url } = req.body;

  console.log(user_id, content, image_url, "post");
  try {
    const newPost = await Post.create({ content, image_url, user_id });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

const getSinglePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const post = await Post.find();

    // if (!post) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Post not found" });
    // }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updatePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from middleware
    const postId = req.params.id; // Get postId from the request parameters

    // Try to either like or unlike the post in a single query
    const post = await Post.findOneAndUpdate(
      { _id: postId, likes: { $elemMatch: { $eq: userId } } },
      { $pull: { likes: userId } }, // If the user already liked, unlike (pull)
      { new: true }
    );

    // If the user hasn't liked the post, use $addToSet to like it
    if (!post) {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } }, // Add userId to likes array if not present
        { new: true }
      );

      return res.status(200).json({ success: true, data: updatedPost });
    }

    // If the user had already liked and we pulled their like, respond with the post
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    post.shares += 1;

    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const savePost = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from middleware
    const postId = req.params.id; // Get postId from the request parameters

    // Try to either Save or unSave the post in a single query
    const post = await Post.findOneAndUpdate(
      { _id: postId, savedBy: { $elemMatch: { $eq: userId } } },
      { $pull: { savedBy: userId } }, // If the user already save, unSave (pull)
      { new: true }
    );

    // If the user hasn't Saved the post, use $addToSet to Save it
    if (!post) {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { saveBy: userId } }, // Add userId to saveBy array if not present
        { new: true }
      );
      return res.status(200).json({ success: true, data: updatedPost });
    }

    // If the user had already Saved and we unsaved from save, respond with the post
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPost,
  getSinglePostById,
  getAllPosts,
  deletePostById,
  updatePostById,
  likePost,
  sharePost,
  savePost,
};