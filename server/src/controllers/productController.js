const Product = require("../models/productModel");
const {
  getProductsService,
  getMenProductsService,
  getWomenProductsService,
  getProductDetailService,
  getRelatedProductsService,
  getFilterProductsService,
  getMaxPriceProductService,
  getMinPriceProductService,
  addProductService,
  editProductService,
  deleteProductService,
  getProductByIdService,
} = require("../services/productService");
const { uploadImages } = require("../utils/uploadImages");

const getProducts = async (req, res) => {
  const { page, limit, name } = req.body;
  const data = await getProductsService({ page, limit, name });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getFilterProducts = async (req, res) => {
  const {
    page,
    limit,
    genders,
    typeProducts,
    brands,
    max_price,
    min_price,
    sort,
    colors,
    search,
  } = req.body;
  console.log(">>> typeProducts: ", typeProducts);
  const data = await getFilterProductsService({
    page,
    limit,
    genders,
    typeProducts,
    brands,
    max_price,
    min_price,
    sort,
    colors,
    search,
  });
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

const getMaxPriceProduct = async (req, res) => {
  const data = await getMaxPriceProductService();
  if (data.SC === 200 && data?.max_price) {
    return res.status(200).json({ success: true, max_price: data.max_price });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getMinPriceProduct = async (req, res) => {
  const data = await getMinPriceProductService();
  if (data.SC === 200 && data?.min_price) {
    return res.status(200).json({ success: true, min_price: data.min_price });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const addProduct = async (req, res) => {
  const { name, price, description, gender, type_product, brand } = req.body;
  const images = req.files;

  console.log(images);

  if (!name || !price || !description || !gender || !type_product || !brand) {
    return res
      .status(400)
      .json({ message: "Vui lòng điền đầy đủ thông tin sản phẩm" });
  }

  // Kiểm tra ít nhất một ảnh được tải lên
  if (!images.image1 && !images.image2 && !images.image3 && !images.image4) {
    return res
      .status(400)
      .json({ message: "Ít nhất một ảnh phải được tải lên" });
  }

  const imagesUpload = Object.values(images)
    .flat()
    .filter((item) => !!item);

  const imageUrls = await uploadImages(imagesUpload);

  const result = await addProductService({
    name,
    price,
    description,
    averageReview: 0,
    images: imageUrls,
    gender,
    brand,
    type_product,
  });

  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const editProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { name, price, description, gender, type_product, brand } = req.body;
  const images = req.files;

  if (!name || !price || !description || !gender || !type_product || !brand) {
    return res
      .status(400)
      .json({ message: "Vui lòng điền đầy đủ thông tin sản phẩm" });
  }

  if (!images.image1 && !images.image2 && !images.image3 && !images.image4) {
    return res
      .status(400)
      .json({ message: "Ít nhất một ảnh phải được tải lên" });
  }

  const imagesUpload = Object.values(images)
    .flat()
    .filter((item) => !!item);

  const imageUrls = await uploadImages(imagesUpload);
  console.log("🖼 Ảnh mới tải lên:", imageUrls);

  if (!imageUrls || imageUrls.length === 0) {
    return res
      .status(400)
      .json({ message: "Không thể tải ảnh lên Cloudinary" });
  }

  const result = await editProductService({
    productId,
    name,
    description,
    gender,
    type_product,
    brand,
    price,
    images: imageUrls,
  });

  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Sản phẩm không hợp lệ !" });
  }
  const result = await deleteProductService(productId);
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const getProductById = async (req, res) => {
  const { id: productId } = req.params;
  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Sản phẩm không hợp lệ !" });
  }
  const result = await getProductByIdService(productId);
  if (result.SC === 200 && result?.product) {
    return res.status(200).json({ success: true, product: result.product });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = {
  getProducts,
  getMenProducts,
  getWomenProducts,
  getRelatedProducts,
  getProductDetail,
  getFilterProducts,
  getMaxPriceProduct,
  getMinPriceProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
};
