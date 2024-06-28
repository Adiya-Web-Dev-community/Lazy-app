const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../model/userModel");
const Company = require("../model/companyModel");
const jwt = require("jsonwebtoken");

const createCompany = async (req, res) => {
  try {
    const response = await Company.create(req.body);

    if (!response) {
      res.status(403).json({
        success: false,
        message: "company not created",
      });
    }
    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const GetData = async (req, res) => {
  try {
    const response = await Company.find();
    if (!response?.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: "Company Not Found" });
    }
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getCompanyById = async (req, res) => {
    const {id}=req.params
    try {
      const response = await Company.findById(id);
      if (!response) {
        return res
          .status(403)
          .json({ success: false, message: "Company Not Found" });
      }
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
const UpdateCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Company Not exists",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company Update successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const DeleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Company.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Company Not delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { createCompany, GetData,getCompanyById, UpdateCompany, DeleteCompany };
