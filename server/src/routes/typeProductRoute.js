const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getTypeProducts,
  getFilterTypeProducts,
  addTypeProduct,
  editTypeProduct,
  deleteTypeProduct,
  getTypeProductById,
  getTypeProductsByCategory,
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

typeProductRouter.put("/edit/:id", verifyToken, checkAdmin, editTypeProduct);

typeProductRouter.delete(
  "/delete/:id",
  verifyToken,
  checkAdmin,
  deleteTypeProduct
);

typeProductRouter.get(
  "/get-type-product/:id",
  verifyToken,
  checkAdmin,
  getTypeProductById
);

typeProductRouter.get(
  "/get-typeProducts-by-category/:category_id",
  getTypeProductsByCategory
);

module.exports = typeProductRouter;
