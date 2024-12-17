const validator = require("validator");
const { loginService, registerService } = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (
    validator.isEmpty(email, { ignore_whitespace: false }) ||
    !validator.isEmail(email)
  ) {
    return res.status(400).json({
      success: false,
      message: "Email cannot be blank and must be in correct format.",
    });
  } else if (
    validator.isEmpty(password, { ignore_whitespace: false }) ||
    password.length < 8
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Password cannot be blank and must be greater than or equal to 8 characters",
    });
  }
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
  if (
    validator.isEmpty(name, { ignore_whitespace: false }) ||
    name.length < 6
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Username cannot be blank and must be greater than or equal to 6 characters",
    });
  } else if (
    validator.isEmpty(email, { ignore_whitespace: false }) ||
    !validator.isEmail(email)
  ) {
    return res.status(400).json({
      success: false,
      message: "Email cannot be blank and must be in correct format.",
    });
  } else if (
    validator.isEmpty(password, { ignore_whitespace: false }) ||
    password.length < 8
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Password cannot be blank and must be greater than or equal to 8 characters",
    });
  } else if (
    validator.isEmpty(phone, { ignore_whitespace: false }) ||
    !phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)
  ) {
    return res.status(400).json({
      success: false,
      message: "Phone cannot be blank and must be in correct format.",
    });
  }

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
