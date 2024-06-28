const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/uservalidate");
const {
  CategoryCreate,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
} = require("../controller/categoryController");

router.post("/category", isAdmin, CategoryCreate);
router.get("/category", isAdmin, GetCategory);
router.put("/category/:id", isAdmin, UpdateCategory);
router.delete("/category/:id", isAdmin, DeleteCategory);

module.exports = router;
