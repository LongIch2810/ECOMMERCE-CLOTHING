const express = require("express");
const {
  addProductToCart,
  updateProductToCart,
  deleteProductToCart,
  deleteAllProductToCart,
  getProductsToCart,
} = require("../controllers/cartController");
const verifyToken = require("../middlewares/verifyToken");
const cartRouter = express.Router();

//Thêm sản phẩm vào giỏ hàng
cartRouter.post("/add", verifyToken, addProductToCart);

//Cập nhật số lượng sản phẩm trong giỏ hàng
cartRouter.put("/update/:id", verifyToken, updateProductToCart);

//Xóa sản phẩm trong giỏ hàng
cartRouter.delete("/delete/:id", verifyToken, deleteProductToCart);

//Xóa tất cả sản phẩm trong giỏ hàng
cartRouter.delete("/delete-all", verifyToken, deleteAllProductToCart);

//Lấy tất danh sách sản phẩm trong giỏ hàng theo người dùng
cartRouter.get("/", verifyToken, getProductsToCart);

module.exports = cartRouter;
