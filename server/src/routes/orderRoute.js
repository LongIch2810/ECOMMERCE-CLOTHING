const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addOrder,
  updatePaymentStatusOrder,
  handlePaymentCancel,
} = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/add", verifyToken, addOrder);
orderRouter.put(
  "/update-payment-status/:id",
  verifyToken,
  updatePaymentStatusOrder
);
orderRouter.post("/refund", verifyToken, handlePaymentCancel);

module.exports = orderRouter;
