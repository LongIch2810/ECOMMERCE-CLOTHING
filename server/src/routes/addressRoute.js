const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addAddress,
  getAddresses,
  getAddressDefault,
} = require("../controllers/addressController");

const addressRouter = express.Router();

addressRouter.post("/add", verifyToken, addAddress);
addressRouter.get("/list", verifyToken, getAddresses);
addressRouter.get("/default", verifyToken, getAddressDefault);

module.exports = addressRouter;
