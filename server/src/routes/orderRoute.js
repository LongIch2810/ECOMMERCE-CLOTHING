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

//Thêm đơn hàng
orderRouter.post("/add", verifyToken, addOrder);

//Lấy danh sách đơn hàng theo người dùng
orderRouter.get("/list", verifyToken, getOrdersByUserId);

//Lấy danh sách đơn hàng có điều kiện lọc
orderRouter.post("/get-all", verifyToken, checkAdmin, getOrders);

//Thay đổi trạng thái đơn hàng
orderRouter.put("/change-status/:id", verifyToken, changeStatus);

//Xác nhận đã nhận hàng
orderRouter.put("/confirm-received/:id", verifyToken, confirmReceived);

//Xác nhận hủy đơn
orderRouter.put("/change-status-cancel/:id", verifyToken, changeStatusCancel);

//Thống kê trạng thái đơn hàng theo năm
orderRouter.post(
  "/statistical-status-year",
  verifyToken,
  checkAdmin,
  statisticalStatusOrderYear
);

//Thống kê trạng thái đơn hàng theo tháng
orderRouter.post(
  "/statistical-status-month",
  verifyToken,
  checkAdmin,
  statisticalStatusOrderMonth
);

//Thống kê trạng thái đơn hàng theo (ngày bắt đầu - ngày kết thúc)
orderRouter.post(
  "/statistical-status-date",
  verifyToken,
  checkAdmin,
  statisticalStatusOrderDate
);

//Thống kê doanh thu theo năm
orderRouter.post(
  "/statistical-revenue-year",
  verifyToken,
  checkAdmin,
  statisticalRevenueYear
);

//Thống kê doanh thu chi tiết theo năm là sẽ hiện danh sách đơn hàng vào năm đó
orderRouter.post(
  "/statistical-revenue-year-detail",
  verifyToken,
  checkAdmin,
  statisticalRevenueYearDetail
);

//Thống kê doanh thu theo tháng
orderRouter.post(
  "/statistical-revenue-month",
  verifyToken,
  checkAdmin,
  statisticalRevenueMonth
);

//Thống kê doanh thu chi tiết theo năm là sẽ hiện danh sách đơn hàng vào tháng đó
orderRouter.post(
  "/statistical-revenue-month-detail",
  verifyToken,
  checkAdmin,
  statisticalRevenueMonthDetail
);

//Thống kê doanh thu chi tiết theo (ngày bắt đầu - ngày kết thúc) là sẽ hiện danh sách đơn hàng vào (ngày bắt đầu - ngày kết thúc) đó
orderRouter.post(
  "/statistical-revenue-date-detail",
  verifyToken,
  checkAdmin,
  statisticalRevenueDateDetail
);

orderRouter.get("/get-order-id/:orderId", verifyToken, fetchOrderDetail);

orderRouter.get("/export-excel", verifyToken, checkAdmin, exportExcel);

module.exports = orderRouter;
