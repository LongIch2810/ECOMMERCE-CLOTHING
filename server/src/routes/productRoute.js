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
  addProduct,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const upload = require("../middlewares/multer");
const productRouter = express.Router();

productRouter.get("/list", getProducts);

productRouter.post("/list/filter", getFilterProducts);

productRouter.get("/gender/men", getMenProducts);

productRouter.get("/gender/women", getWomenProducts);

productRouter.get("/related-products/:id", getRelatedProducts);

productRouter.get("/max-price", getMaxPriceProduct);

productRouter.get("/min-price", getMinPriceProduct);

productRouter.get("/:id", getProductDetail);

productRouter.post(
  "/add-product",
  verifyToken,
  checkAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

module.exports = productRouter;
