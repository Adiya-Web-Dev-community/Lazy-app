const PostCategory = require("../model/postCategoryModel");
const PostCategoryCreate = async (req, res) => {
  try {
    const response = await PostCategory.create(req.body);
    res.status(201).json({
      success: true,
      message: "post category created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const PostGetCategory = async (req, res) => {
  try {
    const response = await PostCategory.find();

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
const PostUpdateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await PostCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!response) {
      res.status(403).json({
        success: false,
        message: "Post Category Not Update",
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
const PostDeleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await PostCategory.findByIdAndDelete(id);
    if (!response) {
      res.status(403).json({
        success: false,
        message: "Post Category Not Deleted",
      });
    }
    res.status(203).json({
      success: true,
      message: "Post category deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  PostCategoryCreate,
  PostGetCategory,
  PostUpdateCategory,
  PostDeleteCategory,
};
