const Voucher = require("../models/voucherModel");

const vouchers = [
  {
    title: "Khuyến mãi 50%",
    number_of_use: 10,
    code: "KM50PERCENT",
    description:
      "Nhân dịp đầu năm mới shop sẽ chúc mừng năm mới các thành viên bằng cách tặng 10 vé voucher 50% cho 10 thành viên nhanh tay.",
    end_date: new Date("2025-05-29T23:59:59.999Z"),
    value: 50,
    max_discount: 100000,
    min_order_price: 300000,
    unit: "%",
    status: "Còn hạn",
  },
  {
    title: "Giảm giá 100k",
    number_of_use: 10,
    code: "GG100VND",
    description:
      "Nhân dịp đầu năm mới shop sẽ chúc mừng năm mới các thành viên bằng cách tặng 10 vé voucher 100k cho 10 thành viên nhanh tay.",
    end_date: new Date("2025-05-29T23:59:59.999Z"),
    value: 100000,
    max_discount: 100000,
    min_order_price: 200000,
    unit: "VND",
    status: "Còn hạn",
  },
];

const seedVoucher = async () => {
  try {
    const addVouchers = vouchers.map(async (voucher) => {
      const newVoucher = await Voucher.create(voucher);
      return await newVoucher.save();
    });

    const results = await Promise.all(addVouchers);
    if (results.length > 0) {
      console.log("Added vouchers successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedVoucher;
