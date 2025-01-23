const {
  addProductToCartService,
  updateProductToCartService,
  deleteProductToCartService,
  getProductsToCartService,
  deleteAllProductToCartService,
} = require("../services/cartService");

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const addProductToCart = async (req, res) => {
  const { id } = req.user;
  const { product_id, size, quantity, stockQuantity } = req.body;
  if (!product_id) {
    return res
      .status(404)
      .json({ success: false, message: "Sản phẩm không tồn tại !" });
  }

  if (!sizes.includes(size)) {
    return res
      .status(404)
      .json({ success: false, message: "Size không tồn tại !" });
  }

  if (quantity < 0) {
    return res
      .status(400)
      .json({ success: false, message: "Số lượng phải lớn hơn 0 !" });
  }

  const data = await addProductToCartService({
    user_id: id,
    product_id,
    size,
    quantity,
    stockQuantity,
  });

  return res.status(data.SC).json({
    success: data.success,
    message: data.message,
  });
};
const updateProductToCart = async (req, res) => {
  const { id: user_id } = req.user;
  const { id } = req.params;
  const { quantity } = req.body;

  if (!id) {
    return res
      .status(404)
      .json({ success: false, message: "Item không tồn tại !" });
  }

  if (quantity < 0) {
    return res
      .status(400)
      .json({ success: false, message: "Số lượng phải lớn hơn 0 !" });
  }

  const data = await updateProductToCartService({
    user_id,
    id,
    quantity,
  });

  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const deleteProductToCart = async (req, res) => {
  const { id: user_id } = req.user;
  const { id } = req.params;

  if (!id) {
    return res
      .status(404)
      .json({ success: false, message: "Item không tồn tại !" });
  }

  const data = await deleteProductToCartService({ user_id, id });

  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const deleteAllProductToCart = async (req, res) => {
  const { id: user_id } = req.user;
  const data = await deleteAllProductToCartService({ user_id });
};

const getProductsToCart = async (req, res) => {
  const { id: user_id } = req.user;
  const data = await getProductsToCartService({ user_id });
  if (data.SC === 200 && data?.cart) {
    return res.status(200).json({ success: true, cart: data.cart });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = {
  addProductToCart,
  updateProductToCart,
  deleteProductToCart,
  deleteAllProductToCart,
  getProductsToCart,
};
