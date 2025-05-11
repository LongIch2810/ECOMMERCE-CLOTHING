const express = require("express");
const {
  login,
  register,
  logout,
  sendOTP,
  resetPassword,
} = require("../controllers/authController");
const validateLogin = require("../middlewares/validateLogin");
const validateRegister = require("../middlewares/validateRegister");
const verifyOTP = require("../middlewares/verifyOTP");
const authRouter = express.Router();

//Route đăng nhập
authRouter.post("/login", validateLogin, login);

//Route đăng ký
authRouter.post("/register", validateRegister, register);

//Route quên mật khẩu
authRouter.post("/forgot-password", sendOTP);

//Route đặt lại mật khẩu
authRouter.post("/reset-password", verifyOTP, resetPassword);

//Route đăng xuất
authRouter.post("/logout", logout);

module.exports = authRouter;
