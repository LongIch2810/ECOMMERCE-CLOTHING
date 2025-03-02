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
} = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/list", getProducts);
productRouter.post("/list/filter", getFilterProducts);
productRouter.get("/gender/men", getMenProducts);
productRouter.get("/gender/women", getWomenProducts);
productRouter.get("/related-products/:id", getRelatedProducts);
productRouter.get("/max-price", getMaxPriceProduct);
productRouter.get("/min-price", getMinPriceProduct);
productRouter.get("/:id", getProductDetail);

module.exports = productRouter;
