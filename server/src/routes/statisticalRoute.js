const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  statisticalProfitYear,
  statisticalProfitMonth,
  statisticalProfitDate,
} = require("../controllers/statisticalController");

const statisticalRouter = express.Router();

statisticalRouter.post(
  "/statistical-profit-year",
  verifyToken,
  checkAdmin,
  statisticalProfitYear
);

statisticalRouter.post(
  "/statistical-profit-month",
  verifyToken,
  checkAdmin,
  statisticalProfitMonth
);

statisticalRouter.post(
  "/statistical-profit-date",
  verifyToken,
  checkAdmin,
  statisticalProfitDate
);

module.exports = statisticalRouter;
