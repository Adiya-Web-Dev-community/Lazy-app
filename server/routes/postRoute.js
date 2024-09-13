const express = require("express");
const router = express.Router();
const { isUser } = require("../middleware/uservalidate");

const {
  createPost,
  getAllPosts,
  getSinglePostById,
  deletePostById,
  updatePostById,
  getPostsByCategory,
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

//get specific post by post id


//creat a new post
router.post("/", createPost);

// update a post
router.put("/:id", updatePostById);

// //delete a post
router.delete("/:id", deletePostById);

// Like/Unlike post
router.put("/:id/like", isUser, likePost);

router.get("/bycategory/:category", getPostsByCategory);

//creat Comment
router.post("/:id/comment", isUser, creatcommentOnPost);

//update Comment
router.post("/:id/comment/:commentId", updateComment);

//delete Comment
router.delete("/:id/comment/:commentId", deleteComment);

// Save/Unsave post
router.put("/:id/save", isUser, savePost);

// Share post
router.put("/:id/share", isUser, sharePost);

module.exports = router;
