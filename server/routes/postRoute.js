const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getSinglePostById,
} = require("../controller/postController");

//get all post
router.get("/", getAllPosts);

//get specific post by post id
router.get("/:id", getSinglePostById);

//creat a new post
router.post("/", createPost);

// update a post
// router.put("/:id", function (req, res) {});

// //delete a post
// router.delete("/:id", function (req, res) {});

module.exports = router;
