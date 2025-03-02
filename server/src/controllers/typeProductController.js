const {
  getTypeProductsService,
  getFilterTypeProductsService,
  addTypeProductService,
} = require("../services/typeProductService");
const generateSlug = require("../utils/generateSlug");
const Category = require("../models/categoryModel");

const getTypeProducts = async (req, res) => {
  const data = await getTypeProductsService();
  if (data.SC === 200 && data?.typeProducts) {
    return res
      .status(200)
      .json({ success: true, typeProducts: data.typeProducts });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getFilterTypeProducts = async (req, res) => {
  const { page, limit, name } = req.body;
  const data = await getFilterTypeProductsService({
    page,
    limit,
    name,
  });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const addTypeProduct = async (req, res) => {
  const { name, category_id } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Tên loại sản phẩm là bắt buộc !" });
  }

  const category = await Category.findById(category_id);

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Danh mục sản phẩm không tồn tại !" });
  }

  const slug = generateSlug(name);
  const data = await addTypeProductService({
    name,
    slug,
    category: category_id,
  });
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = { getTypeProducts, getFilterTypeProducts, addTypeProduct };
