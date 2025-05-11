const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  statisticalProfitYear,
  statisticalProfitMonth,
  statisticalProfitDate,
} = require("../controllers/statisticalController");

const statisticalRouter = express.Router();

//Thống kê lợi nhuận theo năm
statisticalRouter.post(
  "/statistical-profit-year",
  verifyToken,
  checkAdmin,
  statisticalProfitYear
);

//Thống kê lợi nhuận theo tháng
statisticalRouter.post(
  "/statistical-profit-month",
  verifyToken,
  checkAdmin,
  statisticalProfitMonth
);

//Thống kê lợi nhuận theo (ngày bắt đầu - ngày kết thúc)
statisticalRouter.post(
  "/statistical-profit-date",
  verifyToken,
  checkAdmin,
  statisticalProfitDate
);

module.exports = statisticalRouter;
