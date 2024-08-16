const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/uservalidate");
const {
  CreateFAQ,
  UpdateFAQById,
  GetAllFAQController,
  GetFAQById,
  GetFAQByCAtegory,
  deleteFAQ,
  GetFAQByNAme,
} = require("../controller/faqController");

//for Admin
router.post("/", isAdmin, CreateFAQ);
router.put("/:id", isAdmin, UpdateFAQById);
router.get("/:id", isAdmin, GetFAQById);
router.delete("/:id", isAdmin, deleteFAQ);

//For Public
router.get("/", GetAllFAQController);
router.get("/all/:category", GetFAQByCAtegory);
router.get("/get/:name", GetFAQByNAme);
module.exports = router;
