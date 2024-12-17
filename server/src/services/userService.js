const User = require("../models/userModel");

const getUserInfoService = async (data) => {
  const { id } = data;
  try {
    const user = await User.findById(id).select(
      "-password -role -vouchers -deleted -__v"
    );
    return { SC: 200, success: true, user };
  } catch (error) {
    console.log(error);
    return {
      SC: 500,
      success: false,
      message: error.message,
    };
  }
};

module.exports = { getUserInfoService };
