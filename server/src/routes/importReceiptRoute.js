const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  addImportReceipt,
  getFilterImportReceipts,
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

module.exports = importReceiptRouter;
