const express = require("express");
const { getUserInfo } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const userRouter = express.Router();

userRouter.post("/info", verifyToken, getUserInfo);

module.exports = userRouter;
