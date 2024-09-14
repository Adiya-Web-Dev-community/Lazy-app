const Post = require("../model/postModel");

const createPost = async (req, res) => {
  const { user_id, content, image_url, category } = req.body;

  try {
    const newPost = await Post.create({
      content,
      image_url,
      user_id,
      category,
    });
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

    if (!post?.length > 0) {
      return res.status(403).json({
        success: false,
        message: "product not Found",
      });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPostsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    if (category === "all") {
      const response = await Post.find();
      return res.status(200).json(response);
    }

    const post = await Post.find({ category: category });

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
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findOneAndUpdate(
      { _id: postId, savedBy: { $elemMatch: { $eq: userId } } },
      { $pull: { savedBy: userId } }, // If the user already save, unSave (pull)
      { new: true }
    );

    console.log(userId, postId, post, "from save post");

    // If the user hasn't Saved the post, use $addToSet to Save it
    if (!post) {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { savedBy: userId } }, // Add userId to saveBy array if not present
        { new: true }
      );

      console.log(userId, postId, updatedPost, "from save post");
      return res.status(200).json({ success: true, data: updatedPost });
    }

    // If the user had already Saved and we unsaved from save, respond with the post
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getSavedPostsByUser = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the middleware

    // Find posts where the `savedBy` array contains the userId
    const savedPosts = await Post.find({ savedBy: userId });

    console.log(req, req.userId, userId, savedPosts);

    if (savedPosts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No saved posts found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: savedPosts,
    });
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
  getPostsByCategory,
  getSavedPostsByUser,
};
