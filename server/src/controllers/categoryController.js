const { getCategoriesService } = require("../services/categoryService");

const getCategories = async (req, res) => {
  const result = await getCategoriesService();
  if (result.SC === 200 && result.categories) {
    return res
      .status(200)
      .json({ success: true, categories: result.categories });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = { getCategories };
