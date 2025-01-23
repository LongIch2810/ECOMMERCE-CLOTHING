const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

//Them san pham vao gio hang
const addProductToCartService = async ({
  user_id,
  product_id,
  size,
  quantity,
  stockQuantity,
}) => {
  try {
    // Kiểm tra tính hợp lệ của id
    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return {
        SC: 400,
        success: false,
        message: "Mã sản phẩm không đúng định dạng !",
      };
    }

    // Kiểm tra số lượng
    if (!Number.isInteger(quantity) || quantity < 0) {
      return {
        SC: 400,
        success: false,
        message: "Số lượng không đúng định dạng !",
      };
    }

    const cart = await Cart.findOneAndUpdate(
      {
        user: user_id,
        products: { $elemMatch: { product: product_id, size } },
      },
      {
        $inc: { "products.$[item].quantity": quantity },
      },
      {
        new: true,
        arrayFilters: [{ "item.product": product_id, "item.size": size }],
      }
    );

    if (!cart) {
      await Cart.findOneAndUpdate(
        { user: user_id },
        {
          $push: {
            products: {
              $each: [{ product: product_id, size, quantity, stockQuantity }],
              $position: 0,
            },
          },
        },
        { new: true }
      );
    }
    return { SC: 201, success: true, message: "Thêm sản phẩm thành công !" };
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
      return {
        SC: 400,
        success: false,
        message: "Mã sản phẩm không đúng định dạng !",
      };
    }

    // Kiểm tra số lượng
    if (!Number.isInteger(quantity) || quantity < 0) {
      return {
        SC: 400,
        success: false,
        message: "Số lượng không đúng định dạng !",
      };
    }

    const cart = await Cart.findOneAndUpdate(
      { user: user_id, products: { $elemMatch: { _id: id } } },
      { "products.$[item].quantity": quantity },
      { new: true, arrayFilters: [{ "item._id": id }] }
    );

    if (!cart) {
      return { SC: 404, success: false, message: "Giỏ hàng không tồn tại !" };
    }

    return {
      SC: 200,
      success: true,
      message: "Cập nhật số lượng sản phẩm thành công !",
    };
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
      return {
        SC: 400,
        success: false,
        message: "Mã sản phẩm không đúng định dạng !",
      };
    }

    const cart = await Cart.findOneAndUpdate(
      {
        user: user_id,
        "products._id": id,
      },
      { $pull: { products: { _id: id } } },
      { new: true }
    );
    if (!cart) {
      return { SC: 404, success: false, message: "Giỏ hàng không tồn tại !" };
    }

    return {
      SC: 200,
      success: true,
      message: "Xóa sản phẩm thành công !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const deleteAllProductToCartService = async ({ user_id }) => {
  try {
    const cart = await Cart.findOne({ user: user_id });
    if (!cart) {
      return { SC: 404, success: false, message: "Giỏ hàng không tồn tại !" };
    }
    cart.products = [];
    await cart.save();
    return {
      SC: 200,
      success: true,
      message: "Xóa tất cả sản phẩm thành công !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

//Lay tat ca san pham trong gio hang
const getProductsToCartService = async ({ user_id }) => {
  try {
    const cart = await Cart.findOne({ user: user_id }).populate(
      "products.product"
    );
    if (!cart) {
      return { SC: 404, success: false, message: "Giỏ hàng không tồn tại !" };
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
  deleteAllProductToCartService,
  getProductsToCartService,
};
