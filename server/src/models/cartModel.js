const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true },
          size: { type: String, required: true },
          color: {
            type: mongoose.Types.ObjectId,
            ref: "Color",
            required: true,
          },
          stockQuantity: { type: Number, required: true },
        },
      ],
      default: [],
    },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
cartSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
