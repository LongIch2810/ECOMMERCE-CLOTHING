const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getSuppliers,
  addSupplier,
  getFilterSuppliers,
} = require("../controllers/supplierController");

const supplierRouter = express.Router();

supplierRouter.get("/list", verifyToken, checkAdmin, getSuppliers);
supplierRouter.post("/get-all", verifyToken, checkAdmin, getFilterSuppliers);
supplierRouter.post("/add-supplier", verifyToken, checkAdmin, addSupplier);

module.exports = supplierRouter;
