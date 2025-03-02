const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getBrands,
  getFilterBrands,
  addBrand,
} = require("../controllers/brandController");
const upload = require("../middlewares/multer");

const brandRouter = express.Router();

brandRouter.get("/list", getBrands);
brandRouter.post("/filter", verifyToken, checkAdmin, getFilterBrands);
brandRouter.post(
  "/add-brand",
  verifyToken,
  checkAdmin,
  upload.single("logo"),
  addBrand
);

module.exports = brandRouter;
