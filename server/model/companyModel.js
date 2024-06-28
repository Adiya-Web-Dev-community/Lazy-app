const mongoose = require("mongoose");

const companyModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    contactperson: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    website: {
      type: String,
    },
    status: {
      type: String,
      require: true,
    },
    productcount: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("company", companyModel);
module.exports = Company;
