const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getBrands,
  getFilterBrands,
  addBrand,
  editBrand,
  deleteBrand,
  getBrandById,
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

brandRouter.put(
  "/edit/:id",
  verifyToken,
  checkAdmin,
  upload.single("logo"),
  editBrand
);

brandRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteBrand);

brandRouter.get("/get-brand/:id", verifyToken, checkAdmin, getBrandById);

module.exports = brandRouter;
