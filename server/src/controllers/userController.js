const {
  getUserInfoService,
  saveVoucherService,
  getVoucherService,
} = require("../services/userService");

const getUserInfo = async (req, res) => {
  const { id } = req.user;
  const result = await getUserInfoService({ id });
  if (result?.SC === 200 && result?.user) {
    return res
      .status(result.SC)
      .json({ success: result.success, user: result.user });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const saveVoucher = async (req, res) => {
  const { voucher_id } = req.body;
  const { id: user_id } = req.user;
  const data = await saveVoucherService({ user_id, voucher_id });
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getVoucher = async (req, res) => {
  const { id: user_id } = req.user;
  const { id: voucher_id } = req.params;
  const data = await getVoucherService({ user_id, voucher_id });
  if (data.SC === 200 && data?.voucher) {
    return res.status(200).json({ success: true, voucher: data.voucher });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = { getUserInfo, saveVoucher, getVoucher };
