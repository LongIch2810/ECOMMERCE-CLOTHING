const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const { addImportReceipt } = require("../controllers/importReceiptController");

const importReceiptRouter = express.Router();

importReceiptRouter.post(
  "/add-import-receipt",
  verifyToken,
  checkAdmin,
  addImportReceipt
);

module.exports = importReceiptRouter;
