const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
    total_price: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "Mới",
        "Đang xử lý",
        "Đang giao",
        "Giao hàng thành công",
        "Hủy bỏ",
      ],
      default: "Mới",
    },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    voucher: { type: mongoose.Types.ObjectId, ref: "Voucher", default: null },
    payment_method: {
      type: String,
      enum: ["tiền mặt", "paypal", "stripe"],
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    address: { type: mongoose.Types.ObjectId, ref: "Address", required: true },
    shipping: {
      type: mongoose.Types.ObjectId,
      ref: "Shipping",
      required: true,
    },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
orderSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
