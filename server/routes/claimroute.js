const express = require("express");
const router = express.Router();
const { isAdmin,isUser } = require("../middleware/uservalidate");
const {
    createClaim,
    getAllClaim,
    getClaimById,
    getprrovedClaim,
    getClaimbyUserId,
    updateClaim,
    DeleteClaim
} = require("../controller/claimController");

router.post("/", isUser, createClaim);
router.get("/", isAdmin, getAllClaim);
router.get("/:id", isAdmin, getClaimById);
router.get("/all/approved", isAdmin, getprrovedClaim);
router.get("/get/user",isUser,getClaimbyUserId);
router.put("/:id",updateClaim);
router.delete("/:id",DeleteClaim)

module.exports = router;
