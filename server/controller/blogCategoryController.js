const BlogCategory = require("../model/blogcategoryModel");

const BlogCategoryCreate = async (req, res) => {
  try {
    const response = await BlogCategory.create(req.body);
    res.status(201).json({
      success: true,
      message: "Blog category created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetBlogCategory = async (req, res) => {
  try {
    const response = await BlogCategory.find();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const UpdateBlogCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await BlogCategory.findByIdAndUpdate(id, req.body, {
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
const getBlogCategorybyId = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await BlogCategory.findById(id);
      if (!response) {
        res.status(404).json({
          success: false,
          message: "Category Not found",
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
const DeleteBlogCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await BlogCategory.findByIdAndDelete(id);
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
    BlogCategoryCreate,
    GetBlogCategory,
    getBlogCategorybyId,
    UpdateBlogCategory,
    DeleteBlogCategory,
};
