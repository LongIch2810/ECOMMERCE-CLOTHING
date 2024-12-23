const express = require("express");
const {
  getProducts,
  getMenProducts,
  getWomenProducts,
} = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/list", getProducts);
productRouter.get("/gender/men", getMenProducts);
productRouter.get("/gender/women", getWomenProducts);

module.exports = productRouter;
