const Category = require("../models/categoryModel");

const getCategoriesService = async () => {
  try {
    const categories = await Category.find({}).sort({ name: -1 });
    return { SC: 200, success: true, categories };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = { getCategoriesService };
