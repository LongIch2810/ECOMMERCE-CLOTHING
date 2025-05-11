const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { getShipping } = require("../controllers/shippingController");

const shippingRouter = express.Router();

//Lấy danh sách phương thức vận chuyển
shippingRouter.get("/list", verifyToken, getShipping);

module.exports = shippingRouter;
