const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getTypeProducts,
  getFilterTypeProducts,
  addTypeProduct,
} = require("../controllers/typeProductController");

const typeProductRouter = express.Router();

typeProductRouter.get("/list", getTypeProducts);
typeProductRouter.post(
  "/filter",
  verifyToken,
  checkAdmin,
  getFilterTypeProducts
);
typeProductRouter.post(
  "/add-type-product",
  verifyToken,
  checkAdmin,
  addTypeProduct
);

module.exports = typeProductRouter;
