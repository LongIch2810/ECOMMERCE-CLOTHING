const Otp = require("../models/otpModel");
const User = require("../models/userModel");

const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Email và OTP không được để trống" });
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại !" });
    const otpDB = await Otp.findOne({ user: user._id }).sort({ createdAt: -1 });
    if (!otpDB)
      return res
        .status(404)
        .json({
          success: false,
          message: "Mã OTP không tồn tại hoặc đã hết hạn !",
        });
    const isCheck = await otpDB.matchOtp(otp);
    if (!isCheck)
      return res
        .status(400)
        .json({ success: false, message: "OTP Không chính xác !" });
    await Otp.deleteOne({ _id: otpDB._id });
    req.user = { id: user._id };
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = verifyOTP;
