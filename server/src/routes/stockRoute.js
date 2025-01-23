const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { refundQuantity } = require("../controllers/stockController");

const stockRouter = express.Router();

stockRouter.post("/refund-quantity", verifyToken, refundQuantity);

module.exports = stockRouter;
