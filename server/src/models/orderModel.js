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
        total_price: { type: Number, required: true },
      },
    ],
    total_price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    final_price: { type: Number, required: true },
    address: { type: mongoose.Types.ObjectId, ref: "Address", required: true },
    status: {
      type: String,
      enum: ["New", "Processing", "Shipping", "Delivered", "Cancel"],
      default: "New",
    },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    voucher: { type: mongoose.Types.ObjectId, ref: "Voucher", required: true },
    payment: { type: mongoose.Types.ObjectId, ref: "Payment", required: true },
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
