const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addOrder,
  getOrdersByUserId,
  getOrders,
  changeStatus,
  changeStatusCancel,
  statisticalRevenueYear,
  statisticalRevenueMonth,
  statisticalStatusOrderYear,
  statisticalStatusOrderMonth,
  statisticalStatusOrderDate,
  exportExcel,
  fetchOrderDetail,
  statisticalRevenueYearDetail,
  statisticalRevenueMonthDetail,
  statisticalRevenueDateDetail,
  confirmReceived,
} = require("../controllers/orderController");
const checkAdmin = require("../middlewares/checkAdmin");

const orderRouter = express.Router();

orderRouter.post("/add", verifyToken, addOrder);

orderRouter.get("/list", verifyToken, getOrdersByUserId);

orderRouter.post("/get-all", verifyToken, checkAdmin, getOrders);

orderRouter.put("/change-status/:id", verifyToken, changeStatus);

orderRouter.put("/confirm-received/:id", verifyToken, confirmReceived);

orderRouter.put("/change-status-cancel/:id", verifyToken, changeStatusCancel);

orderRouter.post(
  "/statistical-status-year",
  verifyToken,
  checkAdmin,
  statisticalStatusOrderYear
);

orderRouter.post(
  "/statistical-status-month",
  verifyToken,
  checkAdmin,
  statisticalStatusOrderMonth
);

orderRouter.post(
  "/statistical-status-date",
  verifyToken,
  checkAdmin,
  statisticalStatusOrderDate
);

orderRouter.post(
  "/statistical-revenue-year",
  verifyToken,
  checkAdmin,
  statisticalRevenueYear
);

orderRouter.post(
  "/statistical-revenue-year-detail",
  verifyToken,
  checkAdmin,
  statisticalRevenueYearDetail
);

orderRouter.post(
  "/statistical-revenue-month",
  verifyToken,
  checkAdmin,
  statisticalRevenueMonth
);

orderRouter.post(
  "/statistical-revenue-month-detail",
  verifyToken,
  checkAdmin,
  statisticalRevenueMonthDetail
);

orderRouter.post(
  "/statistical-revenue-date-detail",
  verifyToken,
  checkAdmin,
  statisticalRevenueDateDetail
);

orderRouter.get("/get-order-id/:orderId", verifyToken, fetchOrderDetail);

orderRouter.get("/export-excel", verifyToken, checkAdmin, exportExcel);

module.exports = orderRouter;
