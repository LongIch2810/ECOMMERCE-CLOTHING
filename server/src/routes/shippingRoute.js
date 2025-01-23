const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { getShipping } = require("../controllers/shippingController");

const shippingRouter = express.Router();
shippingRouter.get("/list", verifyToken, getShipping);

module.exports = shippingRouter;
