const InfoGuide = require("../model/infoGuideModel");
const Create = async (req, res) => {
  try {
    const newInfoGuide = new InfoGuide(req.body);
    const infoGuide = await newInfoGuide.save();
    res.status(201).json({ success: true, data: infoGuide });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const update = async (req, res) => {
  try {
    const infoGuide = await InfoGuide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!infoGuide) {
      return res
        .status(404)
        .json({ success: false, message: "InfoGuide not found" });
    }
    res.status(200).json({ success: true, data: infoGuide });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const Delete = async (req, res) => {
  try {
    const infoGuide = await InfoGuide.findByIdAndDelete(req.params.id);
    if (!infoGuide) {
      return res
        .status(404)
        .json({ success: false, message: "InfoGuide not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "InfoGuide deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const infoGuides = await InfoGuide.find();
    res.status(200).json(infoGuides);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const infoGuide = await InfoGuide.findById(req.params.id);
    if (!infoGuide) {
      return res
        .status(404)
        .json({ success: false, message: "InfoGuide not found" });
    }
    res.status(200).json({ success: true, data: infoGuide });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
module.exports = {Create,update,Delete,getAll,getById};
