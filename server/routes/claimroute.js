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
    DeleteClaim,
    pendinClaims,
    ConfirmClaim,
    cancelClainms
} = require("../controller/claimController");

router.post("/", isUser, createClaim);
router.get("/", isAdmin, getAllClaim);
router.get("/:id", isAdmin, getClaimById);
router.get("/all/approved", isAdmin, getprrovedClaim);
router.get("/get/user",isUser,getClaimbyUserId);
router.put("/:id",isAdmin,updateClaim);
router.delete("/:id",DeleteClaim);

//claim report
router.get("/report/pending",isUser,pendinClaims);
router.get("/report/confirm",isUser,ConfirmClaim);
router.get("/report/cancel",isUser,cancelClainms)

module.exports = router;
