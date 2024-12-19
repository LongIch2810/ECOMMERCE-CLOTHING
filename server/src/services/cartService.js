const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

//Them san pham vao gio hang
const addProductToCartService = async ({
  user_id,
  product_id,
  size,
  quantity,
}) => {
  try {
    // Kiểm tra tính hợp lệ của product_id
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return { SC: 400, success: false, message: "Invalid product ID" };
    }

    const cart = await Cart.findOne({ user: user_id });
    if (!cart) {
      return { SC: 404, success: false, message: "Cart not found !" };
    }

    const idProduct = new mongoose.Types.ObjectId(product_id);
    console.log(idProduct);
    const products = [...cart.products];
    const indexProduct = products.findIndex(
      (item) => item.product.equals(idProduct) && item.size === size
    );
    if (indexProduct !== -1) {
      products[indexProduct].quantity += quantity;
    } else {
      products.push({ product: product_id, size, quantity });
    }
    cart.products = products;
    await cart.save();
    return { SC: 201, success: true, message: "Product added to cart !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

//Sua so luong san pham trong gio hang
const updateProductToCartService = async ({ user_id, id, quantity }) => {
  try {
    // Kiểm tra tính hợp lệ của id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { SC: 400, success: false, message: "Invalid product ID!" };
    }

    // Kiểm tra số lượng
    if (!Number.isInteger(quantity) || quantity < 0) {
      return { SC: 400, success: false, message: "Invalid quantity value!" };
    }

    const cart = await Cart.findOne({ user: user_id });
    if (!cart) {
      return { SC: 404, success: false, message: "Cart not found !" };
    }
    const itemId = new mongoose.Types.ObjectId(id);

    const products = [...cart.products];
    const indexProduct = products.findIndex((item) => item._id.equals(itemId));

    if (indexProduct === -1) {
      return { SC: 404, success: false, message: "Product not found !" };
    }

    products[indexProduct].quantity = quantity;
    cart.products = products;
    await cart.save();
    return { SC: 200, success: true, message: "Product updated to cart !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

//Xoa san pham trong gio hang
const deleteProductToCartService = async ({ user_id, id }) => {
  try {
    // Kiểm tra tính hợp lệ của id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { SC: 400, success: false, message: "Invalid product ID!" };
    }

    const cart = await Cart.findOne({ user: user_id });
    if (!cart) {
      return { SC: 404, success: false, message: "Cart not found !" };
    }

    const itemId = new mongoose.Types.ObjectId(id);

    const products = [...cart.products];
    const indexProduct = products.findIndex((item) => item._id.equals(itemId));
    if (indexProduct === -1) {
      return { SC: 404, success: false, message: "Product not found !" };
    }
    const newProducts = products.filter((item) => !item._id.equals(itemId));

    console.log(newProducts);
    cart.products = newProducts;
    await cart.save();
    return {
      SC: 200,
      success: true,
      message: "Product deleted successfully !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

//Lay tat ca san pham trong gio hang
const getProductsToCartService = async ({ user_id }) => {
  try {
    const cart = await Cart.findOne({ user: user_id });
    if (!cart) {
      return { SC: 404, success: false, message: "Cart not found !" };
    }
    return { SC: 200, success: true, cart: cart?.products };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  addProductToCartService,
  updateProductToCartService,
  deleteProductToCartService,
  getProductsToCartService,
};
