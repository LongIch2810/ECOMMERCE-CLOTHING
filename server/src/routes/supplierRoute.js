const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getSuppliers,
  addSupplier,
  getFilterSuppliers,
  editSupplier,
  deleteSupplier,
  getSupplierById,
} = require("../controllers/supplierController");

const supplierRouter = express.Router();

//Lấy danh sách nhà cung cấp
supplierRouter.get("/list", verifyToken, checkAdmin, getSuppliers);

//Lấy danh sách nhà cung cấp có điều kiện lọc
supplierRouter.post("/get-all", verifyToken, checkAdmin, getFilterSuppliers);

//Thêm nhà cung cấp
supplierRouter.post("/add-supplier", verifyToken, checkAdmin, addSupplier);

//Sửa nhà cung cấp
supplierRouter.put("/edit/:id", verifyToken, checkAdmin, editSupplier);

//Xóa nhà cung cấp
supplierRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteSupplier);

//Lấy chi tiết nhà cung cấp
supplierRouter.get(
  "/get-supplier/:id",
  verifyToken,
  checkAdmin,
  getSupplierById
);

module.exports = supplierRouter;
