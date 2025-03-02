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

authRouter.post("/login", validateLogin, login);
authRouter.post("/register", validateRegister, register);
authRouter.post("/forgot-password", sendOTP);
authRouter.post("/reset-password", verifyOTP, resetPassword);
authRouter.post("/logout", logout);

module.exports = authRouter;
