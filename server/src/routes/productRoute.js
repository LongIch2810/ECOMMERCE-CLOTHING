const express = require("express");
const {
  getProducts,
  getMenProducts,
  getWomenProducts,
  getProductDetail,
  getRelatedProducts,
  getFilterProducts,
  getMaxPriceProduct,
  getMinPriceProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const upload = require("../middlewares/multer");
const productRouter = express.Router();

//Danh sách sản phẩm chỉ tìm kiếm theo tên -> bên admin
productRouter.post("/list", getProducts);

//Danh sách sản phẩm nhiều trường: giới tính, loại sản phẩm,màu sắc,giá, ... để lọc -> bên customer
productRouter.post("/list/filter", getFilterProducts);

//Danh sách sản phẩm nam -> slider trên trang chủ
productRouter.get("/gender/men", getMenProducts);

//Danh sách sản phẩm nữ -> slider trên trang chủ
productRouter.get("/gender/women", getWomenProducts);

//Danh sách sản phẩm liên quan
productRouter.get("/related-products/:id", getRelatedProducts);

//Lấy sản phẩm có giá lớn nhất -> chưa sử dụng
productRouter.get("/max-price", getMaxPriceProduct);

//Lấy sản phẩm có giá nhỏ nhất -> chưa sử dụng
productRouter.get("/min-price", getMinPriceProduct);

//Chi tiết sản phẩm -> bên admin
productRouter.get("/get-product/:id", verifyToken, checkAdmin, getProductById);

//Thêm sản phẩm
productRouter.post(
  "/add-product",
  verifyToken,
  checkAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

//Sửa sản phẩm
productRouter.put(
  "/edit/:id",
  verifyToken,
  checkAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  editProduct
);

//Xóa sản phẩm
productRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteProduct);

//Lấy chi tiết sản phẩm -> bên customer
productRouter.get("/:id", getProductDetail);
module.exports = productRouter;
