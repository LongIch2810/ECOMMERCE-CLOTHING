const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getSuppliers,
  addSupplier,
} = require("../controllers/supplierController");

const supplierRouter = express.Router();

supplierRouter.post("/get-all", verifyToken, checkAdmin, getSuppliers);
supplierRouter.post("/add-supplier", verifyToken, checkAdmin, addSupplier);

module.exports = supplierRouter;
