const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const loginService = async (data) => {
  const { email, password } = data;
  try {
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return { SC: 404, success: false, message: "User not found !" };
    }

    //check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return { SC: 401, success: false, message: "Incorrect password" };
    }

    const token = generateToken({ id: user._id, role: user.role });

    return { SC: 200, success: true, token, message: "Login successfully !" };
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
  const { name, email, password, phone, role } = data;
  try {
    const user = await User.findOne({ $or: [{ email }, { name }, { phone }] });
    if (user) {
      return {
        SC: 400,
        success: false,
        message: "Username, email or phone already exists !",
      };
    }

    const newUser = await User.create({ name, email, password, phone, role });
    await newUser.save();

    const token = generateToken({ id: newUser._id, role: newUser.role });

    return {
      SC: 201,
      success: true,
      token,
      message: "Register successfully !",
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

module.exports = { loginService, registerService };
