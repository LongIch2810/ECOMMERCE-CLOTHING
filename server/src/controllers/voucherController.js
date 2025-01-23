const { getVouchersService } = require("../services/voucherService");

const getVouchers = async (req, res) => {
  const data = await getVouchersService();
  if (data.SC === 200 && data?.vouchers) {
    return res.status(200).json({ success: true, vouchers: data.vouchers });
  }
  return res.status(data.SC).json({ success: data.SC, message: data.message });
};

module.exports = { getVouchers };
