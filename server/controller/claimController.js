const Claim = require("../model/claimModel");
const ClaimHistory = require("../model/claimhistory");
const mongoose = require("mongoose");
const User = require("../model/userModel");

const createClaim = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const data = req.body;
    const userId = req.userId;
    const claim = new Claim({ ...data, userId });
    const savedClaim = await claim.save({ session });
    const historyEntry = new ClaimHistory({
      claimId: savedClaim._id,
      userId: userId,
      action: [
        {
          status: savedClaim.status,
          updateBy: "user",
          description: "submitted a new claim.",
        },
      ],

      amount: savedClaim.orderamount,
    });
    const savedHistory = await historyEntry.save({ session });
    if (!savedHistory) {
      return res
        .status(403)
        .json({ success: false, message: "history Not created" });
    }
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          claims: {
            claimId: savedClaim._id,
            amount: savedClaim.orderamount,
            status: savedClaim.status,
          },
        },
      },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Claim created successfully.",
      claim: savedClaim,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

const getAllClaim = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    res.status(200).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getprrovedClaim = async (req, res) => {
  try {
    const approvedClaims = await Claim.find({ isApproved: true });
    res.status(200).json(approvedClaims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClaimbyUserId = async (req, res) => {
  const userid = req.userId;
  try {
    const response = await Claim.find({ userId: userid });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClaim = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatedData = req.body;

    const { id } = req.params;
    const updatedClaim = await Claim.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, session, runValidators: true }
    );

    if (!updatedClaim) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Claim not found" });
    }

    const historyUpdate = {
      status: updatedClaim.status,
      updateBy: "LazyBet",
      description: `your Claim is ${updatedClaim.status} by LazyBet`,
    };

    const updatedHistory = await ClaimHistory.findOneAndUpdate(
      { claimId: updatedClaim._id },
      { $push: { action: historyUpdate } },
      { new: true, session }
    );

    console.log(
      updatedHistory,
      historyUpdate,
      updatedClaim,
      updatedData,
      ClaimHistory,
      "from update"
    );
    if (!updatedHistory) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: "History not updated" });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Claim updated successfully.",
      claim: updatedClaim,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

const DeleteClaim = async (req, res) => {
  try {
    const deletedClaim = await Claim.findByIdAndDelete(req.params.id);
    if (!deletedClaim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    res.status(200).json({ message: "Claim deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const pendinClaims = async (req, res) => {
  const userId = req.userId;
  try {
    const pendingClaims = await Claim.find({ status: "pending", userId });
    const totalpendingamount = pendingClaims.reduce(
      (acc, claim) => acc + claim.orderamount,
      0
    );
    res.status(200).json({ pendingClaims, pendingamount: totalpendingamount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ConfirmClaim = async (req, res) => {
  const userId = req.userId;
  try {
    const confirmedClaims = await Claim.find({ status: "confirm", userId });
    const totalProfit = confirmedClaims.reduce(
      (acc, claim) => acc + claim.orderamount,
      0
    );

    res.status(200).json({
      claims: confirmedClaims,
      totalProfit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelClainms = async (req, res) => {
  const userId = req.userId;
  try {
    const canceledClaims = await Claim.find({ status: "cancel", userId });
    const totalcancelAmount = canceledClaims.reduce(
      (acc, claim) => acc + claim.orderamount,
      0
    );
    res.status(200).json({ canceledClaims, cancelAmount: totalcancelAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const singleClaimHistory = async (req, res) => {
  const { id } = req.params;
  try {
    const claimHistory = await ClaimHistory.findOne({
      claimId: id,
    });
    if (!claimHistory) {
      return res.status(404).json({ message: "History not found" });
    }

    res.status(200).json(claimHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
