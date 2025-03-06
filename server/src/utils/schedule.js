const cron = require("node-cron");
const Voucher = require("../models/voucherModel");

const updateExpiredVouchers = async () => {
  try {
    const result = await Voucher.updateMany(
      { end_date: { $lt: new Date() }, status: "Còn hạn" },
      { $set: { status: "Hết hạn" } }
    );
    console.log(
      `Cập nhật trạng thái voucher: ${result.modifiedCount} voucher đã hết hạn.`
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái voucher:", error);
  }
};

const startCronJob = () => {
  updateExpiredVouchers();

  cron.schedule("*/5 * * * *", async () => {
    await updateExpiredVouchers();
  });

  console.log("✅ Cron job cập nhật voucher đang chạy mỗi 5 phút.");
};

module.exports = startCronJob;
