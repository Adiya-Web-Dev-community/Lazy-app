const Blog = require("../model/blogModel");
const BlogReview=require("../model/blogreviewModel")
const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const blog = await newBlog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const GetAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const getSingleBlogByID = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getSingleBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.category });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const UpdateBogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const DeletBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const CreateReview = async (req, res) => {
  try {
    const newReview = new BlogReview(req.body);
    const review = await newReview.save();
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const getReviewByBlogId = async (req, res) => {
  try {
    const reviews = await BlogReview.find({ blogId: req.params.blogId });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
const GetAllRevies = async (req, res) => {
  try {
    const reviews = await BlogReview.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const VerifyReview = async (req, res) => {
  try {
    const review = await BlogReview.findByIdAndUpdate(
      req.params.id,
      { isVerify: true },
      { new: true, runValidators: true }
    );
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deteReview = async (req, res) => {
  try {
    const review = await BlogReview.findByIdAndDelete(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
module.exports = {
    createBlog,
    GetAllBlog,
    getSingleBlogByID,
    getBlogsByCategory,
    UpdateBogById,
    DeletBlogById,
    getSingleBlogBySlug,
    CreateReview,
    getReviewByBlogId,
    VerifyReview,
    deteReview,
    GetAllRevies

};
