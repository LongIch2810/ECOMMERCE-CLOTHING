const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getColors,
  getFilterColors,
  addColor,
  editColor,
  deleteColor,
  getColorById,
} = require("../controllers/colorController");

const colorRouter = express.Router();

//Lấy ra danh sách màu sắc
colorRouter.get("/list", getColors);

//Lấy ra danh sách màu sắc có điều kiện lọc
colorRouter.post("/filter", verifyToken, checkAdmin, getFilterColors);

//Thêm màu sắc mới
colorRouter.post("/add-color", verifyToken, checkAdmin, addColor);

//Sửa màu sắc
colorRouter.put("/edit/:id", verifyToken, checkAdmin, editColor);

//Xóa màu sắc
colorRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteColor);

//Chi tiết màu sắc
colorRouter.get("/get-color/:id", verifyToken, checkAdmin, getColorById);

module.exports = colorRouter;
