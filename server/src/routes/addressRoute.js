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

//Route thêm địa chỉ
addressRouter.post("/add", verifyToken, addAddress);

//Route lấy danh sách địa chỉ của người dùng
addressRouter.get("/list", verifyToken, getAddressesByUserId);

//Route lấy địa chỉ mặc định
addressRouter.get("/default", verifyToken, getAddressDefault);

//Route đặt địa chỉ làm mặc định
addressRouter.put("/set-default/:id", verifyToken, setAddressDefault);

//Lấy tất cả địa chỉ
addressRouter.post("/get-all", verifyToken, checkAdmin, getAddresses);

module.exports = addressRouter;
