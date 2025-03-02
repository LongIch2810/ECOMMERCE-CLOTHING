const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addAddress,
  getAddressDefault,
  getAddressesByUserId,
  getAddresses,
  setAddressDefault,
} = require("../controllers/addressController");
const checkAdmin = require("../middlewares/checkAdmin");

const addressRouter = express.Router();

addressRouter.post("/add", verifyToken, addAddress);
addressRouter.get("/list", verifyToken, getAddressesByUserId);
addressRouter.get("/default", verifyToken, getAddressDefault);
addressRouter.put("/set-default/:id", verifyToken, setAddressDefault);
addressRouter.post("/get-all", verifyToken, checkAdmin, getAddresses);

module.exports = addressRouter;
