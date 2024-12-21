const {
  getProductsService,
  getMenProductsService,
  getWomenProductsService,
} = require("../services/productService");

const getProducts = async (req, res) => {
  const { genderSlug } = req.params;
  const { page, limit } = req.query;
  if (!genderSlug)
    return res
      .status(400)
      .json({ success: false, message: "Please enter gender" });
  const data = await getProductsService({ genderSlug, page, limit });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = { getProducts };
