const express = require("express");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  getUserInfo,
  saveVoucher,
  getVoucher,
  updateInfo,
  updateAvatar,
  getUsers,
  addUser,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer");
const userRouter = express.Router();

userRouter.get("/info", verifyToken, getUserInfo);
userRouter.post("/save-voucher", verifyToken, saveVoucher);
userRouter.get("/voucher-info/:id", verifyToken, getVoucher);
userRouter.put("/update-info", verifyToken, updateInfo);
userRouter.put(
  "/update-avatar",
  verifyToken,
  upload.single("avatar"),
  updateAvatar
);
userRouter.post("/get-all", verifyToken, checkAdmin, getUsers);
userRouter.post(
  "/add-user",
  verifyToken,
  checkAdmin,
  upload.single("avatar"),
  addUser
);

module.exports = userRouter;
