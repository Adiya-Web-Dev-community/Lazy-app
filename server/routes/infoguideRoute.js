const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/uservalidate");
const {
  Create,
  update,
  Delete,
  getAll,
  getById,
} = require("../controller/infoGuideController");


router.post("/",isAdmin,Create)
router.put("/:id",isAdmin,update)
router.delete("/:id",isAdmin,Delete);


//For Public

router.get("/",getAll)
router.get("/getbyid/:id",getById)

module.exports = router;
