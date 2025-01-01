const {
  getProductsService,
  getMenProductsService,
  getWomenProductsService,
  getProductDetailService,
  getRelatedProductsService,
} = require("../services/productService");

const getProducts = async (req, res) => {
  const { page, limit } = req.query;
  const data = await getProductsService({ page, limit });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getMenProducts = async (req, res) => {
  const data = await getMenProductsService({ slug: "nam" });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getWomenProducts = async (req, res) => {
  const data = await getWomenProductsService({ slug: "nu" });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getRelatedProducts = async (req, res) => {
  const { id } = req.params;
  const data = await getRelatedProductsService({ id });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getProductDetail = async (req, res) => {
  const { id } = req.params;
  const data = await getProductDetailService({ id });
  if (data.SC === 200 && data?.result) {
    return res.status(200).json({ success: true, result: data.result });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = {
  getProducts,
  getMenProducts,
  getWomenProducts,
  getRelatedProducts,
  getProductDetail,
};
