const {
  getVouchersService,
  addVoucherService,
} = require("../services/voucherService");
const { validationResult } = require("express-validator");

const getVouchers = async (req, res) => {
  const data = await getVouchersService();
  if (data.SC === 200 && data?.vouchers) {
    return res.status(200).json({ success: true, vouchers: data.vouchers });
  }
  return res.status(data.SC).json({ success: data.SC, message: data.message });
};

const addVoucher = async (req, res) => {
  // Kiểm tra lỗi validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  const result = await addVoucherService({ ...req.body, status: "Còn hạn" });

  return res
    .status(result.SC)
    .json({ success: result, message: result.message });
};

module.exports = { getVouchers, addVoucher };
