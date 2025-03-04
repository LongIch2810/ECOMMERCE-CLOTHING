const express = require("express");
const { getVouchers, addVoucher } = require("../controllers/voucherController");
const validatorVoucher = require("../middlewares/validatorVoucher");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");

const voucherRouter = express.Router();
voucherRouter.get("/list", getVouchers);
voucherRouter.post(
  "/add-voucher",
  verifyToken,
  checkAdmin,
  validatorVoucher,
  addVoucher
);

module.exports = voucherRouter;
