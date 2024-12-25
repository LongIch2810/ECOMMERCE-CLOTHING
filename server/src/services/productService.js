const mongoose = require("mongoose");
const Gender = require("../models/genderModel");
const Product = require("../models/productModel");
const Stock = require("../models/stockModel");

const getProductsService = async ({ page = 1, limit = 10 }) => {
  try {
    const results = {};
    const skip = (page - 1) * limit;
    const total_products = await Product.countDocuments();
    const products = await Product.find({})
      .limit(limit)
      .skip(skip)
      .populate("type_product")
      .populate("supplier")
      .populate("gender")
      .exec();
    results.total_products = total_products;
    results.total_pages = Math.ceil(total_products / limit);
    results.current_page = page;
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getMenProductsService = async ({ slug }) => {
  try {
    const results = {};
    const gender = await Gender.findOne({ slug });
    const products = await Product.find({ gender: gender._id }).limit(10);
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getWomenProductsService = async ({ slug }) => {
  try {
    const results = {};
    const gender = await Gender.findOne({ slug });
    const products = await Product.find({ gender: gender._id }).limit(10);
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getProductDetailService = async ({ id }) => {
  try {
    const product = await Stock.findOne({
      product: new mongoose.Types.ObjectId(id),
    })
      .populate({
        path: "product",
        populate: {
          path: "type_product",
        },
      })
      .select("-quantity -size -deleted -createdAt -updatedAt -__v");
    if (!product) {
      return { SC: 404, success: false, message: "Product not found !" };
    }
    return { SC: 200, success: true, result: product };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getProductsService,
  getMenProductsService,
  getWomenProductsService,
  getProductDetailService,
};
