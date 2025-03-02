const Voucher = require("../models/voucherModel");

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

module.exports = { getVouchersService };
