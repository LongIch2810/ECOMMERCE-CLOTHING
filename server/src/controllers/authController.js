const validator = require("validator");
const { loginService, registerService } = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;
  const data = { email, password };
  const result = await loginService(data);
  if (result?.SC === 200 && result?.token) {
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

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const data = { name, email, password, phone, role: "Customer" };
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

const forgotPassword = (req, res) => {};

const logout = (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logout successfully !" });
};

module.exports = { login, register, forgotPassword, logout };
