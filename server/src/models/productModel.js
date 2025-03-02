const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    averageReview: { type: Number, required: true },
    images: { type: [{ type: String, required: true }], required: true },
    gender: { type: mongoose.Types.ObjectId, ref: "Gender", required: true },
    type_product: {
      type: mongoose.Types.ObjectId,
      ref: "TypeProduct",
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
productSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
