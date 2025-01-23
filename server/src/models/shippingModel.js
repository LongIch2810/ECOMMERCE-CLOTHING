const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const shippingSchema = new Schema(
  {
    shipping_method: {
      type: String,
      enum: ["Tiết kiệm", "Nhanh", "Hỏa tốc"],
      required: true,
    },
    shipping_price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
shippingSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = Shipping;
