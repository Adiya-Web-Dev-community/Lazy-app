const Category = require("../model/ctaegoryModel");
const CategoryCreate = async (req, res) => {
  try {
    const response = await Category.create(req.body);
    res.status(201).json({
      success: true,
      message: "category created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetCategory = async (req, res) => {
  try {
    const response = await Category.find();

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const UpdateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!response) {
      res.status(403).json({
        success: false,
        message: "Category Not Update",
      });
    }
    res.status(203).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const DeleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Category.findByIdAndDelete(id);
    if (!response) {
      res.status(403).json({
        success: false,
        message: "Category Not Deleted",
      });
    }
    res.status(203).json({
      success: true,
      message: "category deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  CategoryCreate,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
};
