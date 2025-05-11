const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  addImportReceipt,
  getFilterImportReceipts,
  fetchImportReceiptDetail,
} = require("../controllers/importReceiptController");

const importReceiptRouter = express.Router();

//Thêm phiếu nhập
importReceiptRouter.post(
  "/add-import-receipt",
  verifyToken,
  checkAdmin,
  addImportReceipt
);

//Lấy danh sách phiếu nhập có điều kiện lọc
importReceiptRouter.post(
  "/filter",
  verifyToken,
  checkAdmin,
  getFilterImportReceipts
);

//Chi tiết phiếu nhập
importReceiptRouter.get(
  "/get-importReceipt-id/:importReceiptId",
  verifyToken,
  checkAdmin,
  fetchImportReceiptDetail
);

module.exports = importReceiptRouter;
