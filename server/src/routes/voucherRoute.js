const express = require("express");
const {
  getVouchers,
  addVoucher,
  editVoucher,
  deleteVoucher,
  getVoucherById,
  getFilterVouchers,
  getVouchersNotExpired,
} = require("../controllers/voucherController");
const validatorVoucher = require("../middlewares/validatorVoucher");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");

const voucherRouter = express.Router();

voucherRouter.get("/list", getVouchersNotExpired);

voucherRouter.post("/filter", verifyToken, checkAdmin, getFilterVouchers);

voucherRouter.post(
  "/add-voucher",
  verifyToken,
  checkAdmin,
  validatorVoucher,
  addVoucher
);

voucherRouter.put(
  "/edit/:id",
  verifyToken,
  checkAdmin,
  validatorVoucher,
  editVoucher
);

voucherRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteVoucher);

voucherRouter.get("/get-voucher/:id", verifyToken, checkAdmin, getVoucherById);
module.exports = voucherRouter;
