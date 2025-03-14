const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const voucherSchema = new Schema(
  {
    title: { type: String, required: true },
    number_of_use: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    end_date: { type: Date, required: true },
    value: { type: Number, required: true },
    max_discount: { type: Number, required: true },
    min_order_price: { type: Number, required: true },
    unit: { type: String, enum: ["%", "VND"], default: "%" },
    status: { type: String, enum: ["Hết hạn", "Còn hạn"], required: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
voucherSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
