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
  editProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const upload = require("../middlewares/multer");
const productRouter = express.Router();

productRouter.post("/list", getProducts);

productRouter.post("/list/filter", getFilterProducts);

productRouter.get("/gender/men", getMenProducts);

productRouter.get("/gender/women", getWomenProducts);

productRouter.get("/related-products/:id", getRelatedProducts);

productRouter.get("/max-price", getMaxPriceProduct);

productRouter.get("/min-price", getMinPriceProduct);

productRouter.get("/get-product/:id", verifyToken, checkAdmin, getProductById);

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

productRouter.put(
  "/edit/:id",
  verifyToken,
  checkAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  editProduct
);

productRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteProduct);

productRouter.get("/:id", getProductDetail);
module.exports = productRouter;
