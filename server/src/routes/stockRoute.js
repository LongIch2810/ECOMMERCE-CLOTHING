const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  refundQuantity,
  statisticalInStock,
} = require("../controllers/stockController");

const stockRouter = express.Router();

//Hoàn trả số lượng
stockRouter.post("/refund-quantity", verifyToken, refundQuantity);

//Thống kê tồn kho
stockRouter.post(
  "/statistical-in-stock",
  verifyToken,
  checkAdmin,
  statisticalInStock
);

module.exports = stockRouter;
