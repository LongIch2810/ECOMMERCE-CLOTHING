const validator = require("validator");
const {
  loginService,
  registerService,
  sendOTPService,
  resetPasswordService,
} = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;
  const data = { email, password };
  const result = await loginService(data);
  if (result?.SC === 200 && result.token) {
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, message: result.message });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const data = { name, email, password, role: "Customer" };
  const result = await registerService(data);
  if (result?.SC === 201 && result?.token) {
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Email không được để trống và phải đúng định dạng !",
    });
  }

  const result = await sendOTPService(email);

  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logout successfully !" });
};

const resetPassword = async (req, res) => {
  const { id: user_id } = req.user;
  const { newPassword } = req.body;

  if (!newPassword)
    return res
      .status(400)
      .json({ message: "Mật khẩu mới không được để trống!" });

  const result = await resetPasswordService({ user_id, newPassword });

  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = { login, register, sendOTP, logout, resetPassword };
