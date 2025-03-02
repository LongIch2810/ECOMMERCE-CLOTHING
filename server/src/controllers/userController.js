const {
  getUserInfoService,
  saveVoucherService,
  getVoucherService,
  updateAvatarService,
  updateInfoService,
  getUsersService,
  addUserService,
} = require("../services/userService");

const cloudinary = require("../configs/cloudinary");

const validator = require("validator");

const getUserInfo = async (req, res) => {
  const { id } = req.user;
  const result = await getUserInfoService({ id });
  if (result?.SC === 200 && result?.user) {
    return res
      .status(result.SC)
      .json({ success: result.success, user: result.user });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const saveVoucher = async (req, res) => {
  const { voucher_id } = req.body;
  const { id: user_id } = req.user;
  const data = await saveVoucherService({ user_id, voucher_id });
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getVoucher = async (req, res) => {
  const { id: user_id } = req.user;
  const { id: voucher_id } = req.params;
  const data = await getVoucherService({ user_id, voucher_id });
  if (data.SC === 200 && data?.voucher) {
    return res.status(200).json({ success: true, voucher: data.voucher });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const updateInfo = async (req, res) => {
  const { id: user_id } = req.user;
  const { username, email, fullname, phone } = req.body;
  if (!username || !email || !fullname || !phone) {
    return res.status(400).json({
      success: false,
      message: "Tất cả các trường phải đầy đủ thông tin !",
    });
  }
  const result = await updateInfoService({
    user_id,
    username,
    email,
    fullname,
    phone,
  });
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const updateAvatar = async (req, res) => {
  try {
    const { id: user_id } = req.user;

    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng chọn ảnh!" });
    }

    // Upload ảnh lên Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "image clothing/avatar", // Lưu vào thư mục avatars trên Cloudinary
    });

    // Lưu URL ảnh vào database
    const result = await updateAvatarService({
      user_id,
      avatar: uploadResult.secure_url, // Lấy URL từ Cloudinary
    });

    return res.status(result.SC).json({
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  const { page, limit, name } = req.body;
  const data = await getUsersService({
    page,
    limit,
    name,
  });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const addUser = async (req, res) => {
  const { name, email, password, fullname, phone, role } = req.body;
  const avatar = req.file;
  if (!avatar) {
    return res
      .status(400)
      .json({ success: false, message: "Ảnh đại diện hiện không có !" });
  }

  if (!name || name.length < 6) {
    return res.status(400).json({
      success: false,
      message:
        "Tên người dùng không được để trống và phải có ít nhất 6 kí tự !",
    });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Email không để trống và phải đúng đinh dạng !",
    });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Mật khẩu không được để trống và phải có ít nhất 8 kí tự !",
    });
  }

  if (!fullname || fullname.length < 3 || fullname.length > 100) {
    return res.status(400).json({
      success: false,
      message:
        "Họ và tên không được để trống, phải có ít nhất 3 kí tự và tối đa 100 kí tự !",
    });
  }

  if (!phone || !phone.match(/^(0\d{9,10})$/g)) {
    return res.status(400).json({
      success: false,
      message: "Số điện thoại không được để trống và phải đúng đinh dạng !",
    });
  }

  if (!role) {
    return res.status(400).json({
      success: false,
      message: "Vai trò không được để trống !",
    });
  }

  // Upload ảnh lên Cloudinary
  const uploadResult = await cloudinary.uploader.upload(avatar.path, {
    folder: "image clothing/avatar", // Lưu vào thư mục avatars trên Cloudinary
  });

  const data = await addUserService({
    avatar: uploadResult.secure_url,
    fullname,
    email,
    phone,
    password,
    role,
    name,
  });

  return res.status(data.SC).json({
    success: data.success,
    message: data.message,
  });
};

module.exports = {
  getUserInfo,
  saveVoucher,
  getVoucher,
  updateInfo,
  updateAvatar,
  getUsers,
  addUser,
};
