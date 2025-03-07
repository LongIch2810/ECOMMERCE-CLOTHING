const Voucher = require("../models/voucherModel");
const moment = require("moment-timezone");

const getVouchersService = async () => {
  try {
    const vouchers = await Voucher.find({}).select(
      "_id title number_of_use code status max_discount min_order_price"
    );
    return { SC: 200, success: true, vouchers };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getFilterVouchersService = async ({ page = 1, limit = 5, code }) => {
  try {
    const filter = {};
    if (code) {
      filter.code = {};
      filter.code.$regex = `.*${code}.*`;
      filter.code.$options = "i";
    }
    const results = {};
    const skip = (page - 1) * limit;
    const vouchers = await Voucher.find(filter)
      .limit(limit)
      .skip(skip)
      .select(
        "_id title number_of_use code status max_discount min_order_price end_date"
      );
    const total_vouchers = await Voucher.countDocuments(filter);
    const total_pages = Math.ceil(total_vouchers / limit);
    results.total_vouchers = total_vouchers;
    results.total_pages = total_pages;
    results.current_page = page;
    results.vouchers = vouchers;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const addVoucherService = async (data) => {
  try {
    const voucher = new Voucher(data);
    await voucher.save();
    return { SC: 201, success: true, message: "Thêm mã giảm giá thành công !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const editVoucherService = async ({
  voucherId,
  title,
  number_of_use,
  code,
  end_date,
  value,
  unit,
  max_discount,
  min_order_price,
}) => {
  try {
    const existingVoucher = await Voucher.findById(voucherId);
    if (!existingVoucher) {
      return {
        SC: 404,
        success: false,
        message: "Mã giảm giá không tồn tại",
      };
    }

    if (code) {
      const isCodeTaken = await Voucher.findOne({
        code,
        _id: { $ne: voucherId },
      });
      if (isCodeTaken) {
        return {
          SC: 400,
          success: false,
          message: "Mã code đã tồn tại",
        };
      }
      existingVoucher.code = code;
    } else {
      return res.status(400).json({
        success: true,
        message: "Mã code không được để trống !",
      });
    }

    const convertedDate = moment
      .tz(end_date, "UTC")
      .tz("Asia/Ho_Chi_Minh")
      .toDate();

    console.log(convertedDate);
    existingVoucher.end_date = convertedDate;
    existingVoucher.title = title;
    existingVoucher.number_of_use = number_of_use;
    existingVoucher.value = value;
    existingVoucher.unit = unit;
    existingVoucher.max_discount = max_discount;
    existingVoucher.min_order_price = min_order_price;
    await existingVoucher.save();

    return {
      SC: 200,
      success: true,
      message: "Cập nhật thông tin mã giảm giá thành công",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const deleteVoucherService = async (voucherId) => {
  try {
    const existingVoucher = await Voucher.findById(voucherId);
    if (!existingVoucher) {
      return {
        SC: 404,
        success: false,
        message: "Mã giảm giá không tồn tại",
      };
    }

    await Voucher.delete({ _id: voucherId });

    return { SC: 200, success: true, message: "Xóa loại sản phẩm thành công" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getVoucherByIdService = async (voucherId) => {
  try {
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return {
        SC: 404,
        success: false,
        message: "Mã giảm giá không tồn tại",
      };
    }

    return { SC: 200, success: true, voucher };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getVouchersNotExpiredService = async () => {
  try {
    const vouchers = await Voucher.find({ status: "Còn hạn" }).select(
      "_id title number_of_use code status max_discount min_order_price"
    );
    return { SC: 200, success: true, vouchers };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getVouchersService,
  addVoucherService,
  editVoucherService,
  deleteVoucherService,
  getVoucherByIdService,
  getVouchersNotExpiredService,
  getFilterVouchersService,
};
