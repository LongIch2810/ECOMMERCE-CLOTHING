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
  editUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/multer");
const userRouter = express.Router();

//Lấy information của người dùng
userRouter.get("/info", verifyToken, getUserInfo);

//Lưu voucher
userRouter.post("/save-voucher", verifyToken, saveVoucher);

//Lấy voucher đã lưu
userRouter.get("/voucher-info/:id", verifyToken, getVoucher);

//cập nhật thông tin người dùng
userRouter.put("/update-info", verifyToken, updateInfo);

//cập nhật avatar
userRouter.put(
  "/update-avatar",
  verifyToken,
  upload.single("avatar"),
  updateAvatar
);

//Lấy danh sách người dùng có điệu kiện lọc
userRouter.post("/get-all", verifyToken, checkAdmin, getUsers);

//Thêm người dùng
userRouter.post(
  "/add-user",
  verifyToken,
  checkAdmin,
  upload.single("avatar"),
  addUser
);

//Sửa người dùng
userRouter.put("/edit/:id", verifyToken, checkAdmin, editUser);

//Xóa người dùng
userRouter.delete("/delete/:id", verifyToken, checkAdmin, deleteUser);

//Chi tiết người dùng
userRouter.get("/get-user/:id", verifyToken, checkAdmin, getUserById);

module.exports = userRouter;
