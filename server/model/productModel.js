const mongoose = require("mongoose");
const FeatureSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  content: {
    type: String,
  },
});
const companySchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
});
const ProductLinkSchema = new mongoose.Schema({
  url: { type: String },
  company: { type: String },
  image: { type: String },
});

const ProductSchemaModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    images: [{ type: String }],
    feature: { type: String },
    description: { type: String },
    recommended: { type: Boolean ,default:false},
    flashSale: { type: Boolean, default:false },
    category: { type: String },
    available: { type: Boolean, default: true },
    status: { type: String, enum: ["Active", "Draft"], default: "Active" },
    productsLink: [ProductLinkSchema],
    company: [companySchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", ProductSchemaModel);
module.exports = Product;
