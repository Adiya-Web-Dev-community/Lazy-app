const Claim=require("../model/claimModel");
const createClaim = async (req, res) => {
  try {
    const claim = new Claim(req.body);
    const savedClaim = await claim.save();
    res.status(201).json(savedClaim);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  try {
    const updatedData = req.body;
    if (updatedData.isApproved) {
      updatedData.status = "claimed";
    }
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedClaim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(400).json({ message: error.message });
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


module.exports = {
    createClaim,
    getAllClaim,
    getClaimById,
    getprrovedClaim,
    getClaimbyUserId,
    updateClaim,
    DeleteClaim
  };