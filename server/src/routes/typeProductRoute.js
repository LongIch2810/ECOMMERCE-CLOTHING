const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getTypeProducts,
  getFilterTypeProducts,
  addTypeProduct,
  editTypeProduct,
  deleteTypeProduct,
  getTypeProductById,
  getTypeProductsByCategory,
} = require("../controllers/typeProductController");

const typeProductRouter = express.Router();

//Lấy danh sách loại sản phẩm
typeProductRouter.get("/list", getTypeProducts);

//Lấy danh sách loại sản phẩm có điều kiện lọc
typeProductRouter.post(
  "/filter",
  verifyToken,
  checkAdmin,
  getFilterTypeProducts
);

//Thêm loại sản phẩm
typeProductRouter.post(
  "/add-type-product",
  verifyToken,
  checkAdmin,
  addTypeProduct
);

//Sửa loại sản phẩm
typeProductRouter.put("/edit/:id", verifyToken, checkAdmin, editTypeProduct);

//Xóa loại sản phẩm
typeProductRouter.delete(
  "/delete/:id",
  verifyToken,
  checkAdmin,
  deleteTypeProduct
);

//Lấy chi tiết loại sản phẩm
typeProductRouter.get(
  "/get-type-product/:id",
  verifyToken,
  checkAdmin,
  getTypeProductById
);

//Lấy danh sách loại sản phẩm theo danh mục
typeProductRouter.get(
  "/get-typeProducts-by-category/:category_id",
  getTypeProductsByCategory
);

module.exports = typeProductRouter;
