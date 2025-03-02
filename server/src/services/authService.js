const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const OTP = require("../models/otpModel");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");
const sendMail = require("../utils/email");

const loginService = async (data) => {
  const { email, password } = data;
  try {
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return { SC: 404, success: false, message: "Người dùng không tồn tại !" };
    }

    //check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return { SC: 401, success: false, message: "Mật khẩu không chính xác !" };
    }

    const token = generateToken({ id: user._id, role: user.role });

    return { SC: 200, success: true, token, message: "Đăng nhập thành công !" };
  } catch (error) {
    console.log(error);
    return {
      SC: 500,
      success: false,
      message: error.message,
    };
  }
};

const registerService = async (data) => {
  const { name, email, password, role } = data;
  try {
    const user = await User.findOne({ $or: [{ email }, { name }] });
    if (user) {
      return {
        SC: 400,
        success: false,
        message: "Người dùng đã tồn tại !",
      };
    }

    const newUser = await User.create({ name, email, password, role });
    await newUser.save();

    await Cart.create({
      user: newUser._id,
    });

    const token = generateToken({ id: newUser._id, role: newUser.role });

    return {
      SC: 201,
      success: true,
      token,
      message: "Đăng ký thành công !",
    };
  } catch (error) {
    console.log(error);
    return {
      SC: 500,
      success: false,
      message: error.message,
    };
  }
};

const sendOTPService = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { SC: 404, success: false, message: "Email không tồn tại !" };
    }
    const code = generateOTP();
    const otp = new OTP({ user: user._id, code });
    await otp.save();

    const subject = "Mã xác thực OTP của bạn 🔒";

    const body = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">Xác thực tài khoản</h2>
      <p>Xin chào <strong>${user?.name || "bạn"}</strong>,</p>
      <p>Đây là mã OTP của bạn: </p>
      <h2 style="text-align: center; font-size: 24px; color: #007bff;">${code}</h2>
      <p>Mã này có hiệu lực trong <strong>10 phút</strong>. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
      <p>Trân trọng,</p>
      <p><strong>Đội ngũ hỗ trợ</strong></p>
      <hr style="border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #777;">Đây là email tự động, vui lòng không trả lời.</p>
    </div>
  `;

    await sendMail(email, subject, body);

    return {
      SC: 200,
      success: true,
      message:
        "Đã gửi mã OTP tới email của bạn, vui lòng kiểm tra hộp thư của bạn !",
    };
  } catch (error) {
    console.log(error);
    return {
      SC: 500,
      success: false,
      message: error.message,
    };
  }
};

const resetPasswordService = async ({ user_id, newPassword }) => {
  try {
    const user = await User.findById(user_id);
    if (!user)
      return { SC: 404, success: false, message: "Người dùng không tồn tại!" };

    user.password = newPassword;

    await user.save();

    return { SC: 200, success: true, message: "Đổi mật khẩu thành công!" };
  } catch (error) {
    console.log(error);
    return {
      SC: 500,
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  loginService,
  registerService,
  sendOTPService,
  resetPasswordService,
};
