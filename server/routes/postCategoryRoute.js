const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/uservalidate");
const {
  PostCategoryCreate,
  PostGetCategory,
  PostUpdateCategory,
  PostDeleteCategory,
} = require("../controller/postCategoryController");

//admin only
router.post("/post/category", isAdmin, PostCategoryCreate);
router.put("/post/category/:id", isAdmin, PostUpdateCategory);
router.delete("/post/category/:id", isAdmin, PostDeleteCategory);

//for both admin and user
router.get("/post/category", PostGetCategory);

module.exports = router;
