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

//Lấy danh sách voucher chưa hết hạn -> bên customer
voucherRouter.get("/list", getVouchersNotExpired);

//Lấy danh sách voucher có điều kiện lọc -> bên admin
voucherRouter.post("/filter", verifyToken, checkAdmin, getFilterVouchers);

//Thêm voucher
voucherRouter.post(
  "/add-voucher",
  verifyToken,
  checkAdmin,
  validatorVoucher,
  addVoucher
);

//Sửa voucher
voucherRouter.put(
  "/edit/:id",
  verifyToken,
  checkAdmin,
  validatorVoucher,
  editVoucher
);

//Xóa voucher
voucherRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteVoucher);

//Chi tiết voucher
voucherRouter.get("/get-voucher/:id", verifyToken, checkAdmin, getVoucherById);
module.exports = voucherRouter;
