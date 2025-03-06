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

supplierRouter.get("/list", verifyToken, checkAdmin, getSuppliers);

supplierRouter.post("/get-all", verifyToken, checkAdmin, getFilterSuppliers);

supplierRouter.post("/add-supplier", verifyToken, checkAdmin, addSupplier);

supplierRouter.put("/edit/:id", verifyToken, checkAdmin, editSupplier);

supplierRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteSupplier);

supplierRouter.get(
  "/get-supplier/:id",
  verifyToken,
  checkAdmin,
  getSupplierById
);

module.exports = supplierRouter;
