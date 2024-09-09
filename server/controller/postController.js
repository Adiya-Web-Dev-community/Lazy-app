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

module.exports = {
  createPost,
  getSinglePostById,
  getAllPosts,
};
