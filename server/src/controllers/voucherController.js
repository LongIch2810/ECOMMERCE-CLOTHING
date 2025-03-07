const {
  getVouchersService,
  addVoucherService,
  editVoucherService,
  deleteVoucherService,
  getVoucherByIdService,
  getVouchersNotExpiredService,
  getFilterVouchersService,
} = require("../services/voucherService");
const { validationResult } = require("express-validator");

const getVouchers = async (req, res) => {
  const data = await getVouchersService();
  if (data.SC === 200 && data?.vouchers) {
    return res.status(200).json({ success: true, vouchers: data.vouchers });
  }
  return res.status(data.SC).json({ success: data.SC, message: data.message });
};

const getFilterVouchers = async (req, res) => {
  const { page, limit, code } = req.body;
  console.log(code);
  const data = await getFilterVouchersService({
    page,
    limit,
    code,
  });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const addVoucher = async (req, res) => {
  // Kiểm tra lỗi validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  const now = new Date();
  const selectedDate = new Date(req.body?.end_date);
  if (selectedDate <= now) {
    return res.status(400).json({
      success: false,
      message: "Ngày kết thúc phải lớn hơn ngày hiện tại",
    });
  }

  const result = await addVoucherService({ ...req.body, status: "Còn hạn" });

  return res
    .status(result.SC)
    .json({ success: result, message: result.message });
};

const editVoucher = async (req, res) => {
  const { id: voucherId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  console.log("end_date nhận từ request:", req.body.end_date);
  const result = await editVoucherService({ ...req.body, voucherId });

  return res
    .status(result.SC)
    .json({ success: result, message: result.message });
};

const deleteVoucher = async (req, res) => {
  const { id: voucherId } = req.params;
  if (!voucherId) {
    return res
      .status(400)
      .json({ success: false, message: "Mã giảm giá không hợp lệ !" });
  }
  const result = await deleteVoucherService(voucherId);
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const getVoucherById = async (req, res) => {
  const { id: voucherId } = req.params;
  if (!voucherId) {
    return res
      .status(400)
      .json({ success: false, message: "Mã giảm giá không hợp lệ !" });
  }
  const result = await getVoucherByIdService(voucherId);
  if (result.SC === 200 && result?.voucher) {
    return res.status(200).json({ success: true, voucher: result.voucher });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const getVouchersNotExpired = async (req, res) => {
  const data = await getVouchersNotExpiredService();
  if (data.SC === 200 && data?.vouchers) {
    return res.status(200).json({ success: true, vouchers: data.vouchers });
  }
  return res.status(data.SC).json({ success: data.SC, message: data.message });
};

module.exports = {
  getVouchers,
  addVoucher,
  editVoucher,
  deleteVoucher,
  getVoucherById,
  getVouchersNotExpired,
  getFilterVouchers,
};
