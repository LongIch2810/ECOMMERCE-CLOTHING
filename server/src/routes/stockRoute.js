const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  refundQuantity,
  statisticalInStock,
} = require("../controllers/stockController");

const stockRouter = express.Router();

stockRouter.post("/refund-quantity", verifyToken, refundQuantity);

stockRouter.post(
  "/statistical-in-stock",
  verifyToken,
  checkAdmin,
  statisticalInStock
);

module.exports = stockRouter;
