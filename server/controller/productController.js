const Product = require("../model/productModel");

const CreateProduct = async (req, res) => {
  try {
    const response = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const GetAllProduct = async (req, res) => {
  try {
    const response = await Product.find();
    if (!response?.length > 0) {
      return res.status(403).json({
        success: false,
        message: "product not Found",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findById(id);
    if (!response) {
      return res.status(403).json({
        success: false,
        message: "product not Found",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!response) {
      res.status(403).json({
        success: false,
        message: "Product Not Update",
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
const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product.findByIdAndDelete(id);
    if (!response) {
      res.status(403).json({
        success: false,
        message: "Product Not Deleted",
      });
    }
    res.status(203).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const GetProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const response = await Product.find({ category: category });
    if (!response?.length > 0) {
      return res.status(403).json({
        success: false,
        message: "product not Found",
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const UpdateProductImage = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  try {
    if (image && typeof image === "string") {
      const response = await Product.findByIdAndUpdate(
        id,
        { $push: { images: image } },
        { new: true }
      );
      if (!response) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing image field",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getRecommendedProducts = async (req, res) => {
  try {
    const response = await Product.find({ recommended: true });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getflashSaleProducts = async (req, res) => {
  try {
    const response = await Product.find({ flashSale: true });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  CreateProduct,
  GetAllProduct,
  GetProductById,
  UpdateProduct,
  DeleteProduct,
  GetProductByCategory,
  UpdateProductImage,
  getRecommendedProducts,
  getflashSaleProducts

};
