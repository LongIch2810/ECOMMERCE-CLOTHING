const express = require("express");
const {
  login,
  register,
  forgotPassword,
  logout,
} = require("../controllers/authController");
const validateLogin = require("../middlewares/validateLogin");
const validateRegister = require("../middlewares/validateRegister");
const authRouter = express.Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/register", validateRegister, register);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/logout", logout);

module.exports = authRouter;
