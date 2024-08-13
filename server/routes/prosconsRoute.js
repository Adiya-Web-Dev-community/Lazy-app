const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/uservalidate");
const {
  create,
  update,
  Delete,
  getbyProsuctId,
  getAllProsconController,
} = require("../controller/prosconsController");

// For Admin
router.post("/", isAdmin, create);
router.get("/", isAdmin, getAllProsconController);
router.put("/:id", isAdmin, update);
router.delete("/:id", isAdmin, Delete);

//For Public
router.get("/:productId", getbyProsuctId);

module.exports = router;
