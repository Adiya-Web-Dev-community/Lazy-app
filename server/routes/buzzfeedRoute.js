const express = require("express");
const router = express.Router();
const { isAdmin,isUser } = require("../middleware/uservalidate");
const {
    createbuzzpost,getAllpost,getpostbycretedby,likeunlikeBuzzpos,commentBuzzfeed,deletebuzzfeepost,updatebuzzfeepost,getSinglebuzzfeedpost
} = require("../controller/buzzfeedController");




//For Public
router.post("/", createbuzzpost);
router.get("/", getAllpost);
router.get("/get",isUser, getpostbycretedby);
router.put("/:id",isUser,updatebuzzfeepost);
router.put("/like/:id",isUser,likeunlikeBuzzpos);
router.patch("comment/:id",isUser,commentBuzzfeed);
router.delete("/:id",isUser,deletebuzzfeepost);
router.get("single/post/:id",isUser,getSinglebuzzfeedpost);

module.exports = router;
