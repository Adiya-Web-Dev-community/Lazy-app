const express = require("express");
const router = express.Router();
const { isAdmin, isUser } = require("../middleware/uservalidate");
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
  cancelClainms,
  singleClaimHistory,
  getClaimByStatus,
  getClaimUserId,
} = require("../controller/claimController");

//getting status wise claim
router.get("/bystatus", isAdmin, getClaimByStatus);

router.post("/", isUser, createClaim);
router.get("/", isAdmin, getAllClaim);
router.get("/:id", isAdmin, getClaimById);
router.get("/all/approved", isAdmin, getprrovedClaim);

router.get("/get/user", isUser, getClaimbyUserId);
router.patch("/:id", isAdmin, updateClaim);
router.delete("/:id", DeleteClaim);

//getting history of claim
router.get("/history/:id", singleClaimHistory);
router.get("/get/:id", getClaimUserId);

//claim report
router.get("/report/pending", isUser, pendinClaims);
router.get("/report/confirm", isUser, ConfirmClaim);
router.get("/report/cancel", isUser, cancelClainms);

module.exports = router;
