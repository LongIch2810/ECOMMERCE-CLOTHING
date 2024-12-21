const Gender = require("../models/genderModel");
const Product = require("../models/productModel");

const getProductsService = async ({ genderSlug, page = 1, limit = 10 }) => {
  try {
    const gender = await Gender.findOne({ slug: genderSlug });
    const results = {};
    const total_products = await Product.countDocuments();
    const total_pages = Math.ceil(total_products / limit);
    const current_page = page > total_pages ? total_pages : page;
    const skip = (current_page - 1) * limit;
    const products = await Product.find({ gender: gender._id })
      .limit(limit)
      .skip(skip)
      .populate("type_product")
      .populate("supplier")
      .populate("gender")
      .exec();

    results.total_products = total_products;
    results.total_pages = total_pages;
    results.current_page = current_page;
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = { getProductsService };
