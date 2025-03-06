const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getColors,
  getFilterColors,
  addColor,
  editColor,
  deleteColor,
  getColorById,
} = require("../controllers/colorController");

const colorRouter = express.Router();

colorRouter.get("/list", getColors);

colorRouter.post("/filter", verifyToken, checkAdmin, getFilterColors);

colorRouter.post("/add-color", verifyToken, checkAdmin, addColor);

colorRouter.put("/edit/:id", verifyToken, checkAdmin, editColor);

colorRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteColor);

colorRouter.get("/get-color/:id", verifyToken, checkAdmin, getColorById);

module.exports = colorRouter;
