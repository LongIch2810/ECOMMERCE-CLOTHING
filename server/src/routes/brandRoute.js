const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getBrands,
  getFilterBrands,
  addBrand,
  editBrand,
  deleteBrand,
  getBrandById,
} = require("../controllers/brandController");
const upload = require("../middlewares/multer");

const brandRouter = express.Router();

//Route lấy danh sách thương hiệu
brandRouter.get("/list", getBrands);

//Route lấy danh sách thương hiệu có điều kiện lọc
brandRouter.post("/filter", verifyToken, checkAdmin, getFilterBrands);

//Route thêm thương hiệu
brandRouter.post(
  "/add-brand",
  verifyToken,
  checkAdmin,
  upload.single("logo"),
  addBrand
);

//Route sửa thương hiệu
brandRouter.put(
  "/edit/:id",
  verifyToken,
  checkAdmin,
  upload.single("logo"),
  editBrand
);

//Route xóa thương hiệu
brandRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteBrand);

//Lấy chi tiết thương hiệu
brandRouter.get("/get-brand/:id", verifyToken, checkAdmin, getBrandById);

module.exports = brandRouter;
