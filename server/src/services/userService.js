const mongoose = require("mongoose");
const User = require("../models/userModel");
const Voucher = require("../models/voucherModel");

const getUserInfoService = async (data) => {
  const { id } = data;
  try {
    const user = await User.findById(id)
      .select("-password -role  -deleted -__v")
      .populate({
        path: "vouchers",
        populate: {
          path: "voucher",
        },
      });
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

const saveVoucherService = async ({ user_id, voucher_id }) => {
  try {
    // Kiểm tra tính hợp lệ của id
    if (!mongoose.Types.ObjectId.isValid(voucher_id)) {
      return {
        SC: 400,
        success: false,
        message: "Mã giảm giá không đúng định dạng !",
      };
    }

    //Mã giảm giá có tồn tại trong kho mã giảm giá
    const voucher = await Voucher.findById(voucher_id);
    if (!voucher) {
      return {
        SC: 400,
        success: false,
        message: "Mã giảm giá không tồn tại !",
      };
    }

    const user = await User.findById(user_id);
    const index = user.vouchers.findIndex((item) =>
      item.voucher.equals(new mongoose.Types.ObjectId(voucher_id))
    );
    if (index !== -1) {
      return {
        SC: 400,
        success: false,
        message: "Mã giảm giá đã được lưu !",
      };
    }
    user.vouchers.unshift({ voucher: voucher_id });
    await user.save();
    voucher.number_of_use -= 1;
    await voucher.save();
    return { SC: 201, success: true, message: "Lưu mã giảm giá thành công !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getVoucherService = async ({ user_id, voucher_id }) => {
  try {
    // Kiểm tra tính hợp lệ của id
    if (!mongoose.Types.ObjectId.isValid(voucher_id)) {
      return {
        SC: 400,
        success: false,
        message: "Mã giảm giá không đúng định dạng !",
      };
    }

    //Mã giảm giá có tồn tại trong kho mã giảm giá
    const voucher = await Voucher.findById(voucher_id);
    if (!voucher) {
      return {
        SC: 400,
        success: false,
        message: "Mã giảm giá không tồn tại !",
      };
    }

    const user = await User.findById(user_id);
    const index = user.vouchers.findIndex((item) =>
      item.voucher.equals(new mongoose.Types.ObjectId(voucher_id))
    );

    if (index === -1) {
      return {
        SC: 400,
        success: false,
        message:
          "Mã giảm giá không tồn tại trong danh sách mã giảm giá của bạn !",
      };
    }

    const voucherInfo = await Voucher.findById(user.vouchers[index].voucher);

    return { SC: 200, success: true, voucher: voucherInfo };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = { getUserInfoService, saveVoucherService, getVoucherService };
