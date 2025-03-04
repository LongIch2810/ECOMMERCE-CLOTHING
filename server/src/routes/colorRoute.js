const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getColors,
  getFilterColors,
} = require("../controllers/colorController");

const colorRouter = express.Router();

colorRouter.get("/list", getColors);
colorRouter.post("/filter", verifyToken, checkAdmin, getFilterColors);

module.exports = colorRouter;
