const Gender = require("../models/genderModel");
const Product = require("../models/productModel");

const getProductsService = async ({ genderSlug, page = 1, limit = 10 }) => {
  try {
    const gender = await Gender.findOne({ slug: genderSlug });
    const results = {};
    const skip = (page - 1) * limit;
    const total_products = (await Product.find({ gender: gender._id })).length;
    const products = await Product.find({ gender: gender._id })
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

module.exports = {
  getProductsService,
};
