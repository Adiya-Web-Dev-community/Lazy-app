const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getSinglePostById,
  deletePostById,
  updatePostById,
} = require("../controller/postController");

//get all post
router.get("/", getAllPosts);

//get specific post by post id
router.get("/:id", getSinglePostById);

//creat a new post
router.post("/", createPost);

// update a post
router.put("/:id", updatePostById);

// //delete a post
router.delete("/:id", deletePostById);

module.exports = router;
