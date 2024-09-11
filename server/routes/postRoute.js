const express = require("express");
const router = express.Router();
const { isUser } = require("../middleware/uservalidate");

const {
  createPost,
  getAllPosts,
  getSinglePostById,
  deletePostById,
  updatePostById,
  likePost,
  sharePost,
  savePost,
} = require("../controller/postController");
const {
  creatcommentOnPost,
  updateComment,
  deleteComment,
} = require("../controller/commentController");

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

// Like/Unlike post
router.put("/:id/like", isUser, likePost);

// Share post
router.put("/:id/share", isUser, sharePost);

// Comment on post

//creat Comment
router.post("/:id/comment", isUser, creatcommentOnPost);

//update Comment
router.post("/:id/comment/:commentId", updateComment);

//delete Comment
router.delete("/:id/comment/:commentId", deleteComment);

// Save/Unsave post
router.put("/:id/save", isUser, savePost);

module.exports = router;
