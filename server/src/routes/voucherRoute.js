const express = require("express");
const { getVouchers } = require("../controllers/voucherController");

const voucherRouter = express.Router();
voucherRouter.get("/list", getVouchers);

module.exports = voucherRouter;
