const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Voucher = require("../models/voucherModel");

const getUserInfoService = async (data) => {
  const { id } = data;
  try {
    const user = await User.findById(id)
      .select("-password  -deleted -__v")
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

const updateInfoService = async (data) => {
  const { user_id, username, email, fullname, phone } = data;
  try {
    await User.findByIdAndUpdate(user_id, {
      name: username,
      email,
      fullname,
      phone,
    });
    return {
      SC: 200,
      success: true,
      message: "Cập nhật thông tin thành công !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const updateAvatarService = async (data) => {
  const { user_id, avatar } = data;

  try {
    await User.findByIdAndUpdate(user_id, { avatar });
    return {
      SC: 200,
      success: true,
      message: "Cập nhật ảnh giao diện thành công !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getUsersService = async ({ page = 1, limit = 5, name }) => {
  try {
    const filter = {};

    if (name) {
      filter.name = {};
      filter.name.$regex = `.*${name}.*`;
      filter.name.$options = "i";
    }
    const results = {};
    const skip = (page - 1) * limit;
    const users = await User.find(filter)
      .limit(limit)
      .skip(skip)
      .select("_id name email phone fullname");
    const total_users = await User.countDocuments(filter);
    const total_pages = Math.ceil(total_users / limit);
    results.total_users = total_users;
    results.total_pages = total_pages;
    results.current_page = page;
    results.users = users;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const editUserService = async (data) => {
  try {
    const { user_id, name, fullname, avatar, phone, email, password } = data;
    const bcryptPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user_id, {
      name,
      fullname,
      avatar,
      phone,
      email,
      password: bcryptPassword,
    });
    return {
      SC: 200,
      success: true,
      message: "Cập nhật thông tin người dùng thành công !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const addUserService = async (data) => {
  try {
    const newUser = new User(data);
    await newUser.save();
    return { SC: 201, success: true, message: "Thêm người dùng thành công !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const deleteUserService = async (user_id) => {
  try {
    await User.delete(user_id);
    return { SC: 200, success: true, message: "Xóa người dùng thành công !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getUserInfoService,
  saveVoucherService,
  getVoucherService,
  updateInfoService,
  updateAvatarService,
  getUsersService,
  editUserService,
  deleteUserService,
  addUserService,
};
