const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  addImportReceipt,
  getFilterImportReceipts,
  fetchImportReceiptDetail,
} = require("../controllers/importReceiptController");

const importReceiptRouter = express.Router();

importReceiptRouter.post(
  "/add-import-receipt",
  verifyToken,
  checkAdmin,
  addImportReceipt
);

importReceiptRouter.post(
  "/filter",
  verifyToken,
  checkAdmin,
  getFilterImportReceipts
);

importReceiptRouter.get(
  "/get-importReceipt-id/:importReceiptId",
  verifyToken,
  checkAdmin,
  fetchImportReceiptDetail
);

module.exports = importReceiptRouter;
