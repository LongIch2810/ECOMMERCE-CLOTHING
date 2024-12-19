const express = require("express");
const {
  addProductToCart,
  updateProductToCart,
  deleteProductToCart,
  getProductsToCart,
} = require("../controllers/cartController");
const verifyToken = require("../middlewares/verifyToken");
const cartRouter = express.Router();

cartRouter.post("/add", verifyToken, addProductToCart);
cartRouter.put("/update/:id", verifyToken, updateProductToCart);
cartRouter.delete("/delete/:id", verifyToken, deleteProductToCart);
cartRouter.get("/", verifyToken, getProductsToCart);

module.exports = cartRouter;
