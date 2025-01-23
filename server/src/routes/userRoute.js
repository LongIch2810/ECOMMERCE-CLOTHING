const express = require("express");
const {
  getUserInfo,
  saveVoucher,
  getVoucher,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const userRouter = express.Router();

userRouter.get("/info", verifyToken, getUserInfo);
userRouter.post("/save-voucher", verifyToken, saveVoucher);
userRouter.get("/voucher-info/:id", verifyToken, getVoucher);

module.exports = userRouter;
