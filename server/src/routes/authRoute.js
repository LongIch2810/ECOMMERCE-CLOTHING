const express = require("express");
const {
  login,
  register,
  forgotPassword,
  logout,
} = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/logout", logout);

module.exports = authRouter;
