const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const importReceiptSchema = new Schema(
  {
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL"],
          required: true,
        },
        quantity: { type: Number, required: true },
        color: { type: mongoose.Types.ObjectId, ref: "Color", required: true },
        import_price: { type: Number, required: true },
      },
    ],
    total_price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

importReceiptSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const ImportReceipt = mongoose.model("ImportReceipt", importReceiptSchema);

module.exports = ImportReceipt;
