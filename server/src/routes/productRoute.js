const express = require("express");
const {
  getProducts,
  getMenProducts,
  getWomenProducts,
  getProductDetail,
  getRelatedProducts,
} = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/list", getProducts);
productRouter.get("/gender/men", getMenProducts);
productRouter.get("/gender/women", getWomenProducts);
productRouter.get("/related-products/:id", getRelatedProducts);
productRouter.get("/:id", getProductDetail);

module.exports = productRouter;
