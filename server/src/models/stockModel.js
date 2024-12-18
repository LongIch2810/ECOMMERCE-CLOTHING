const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Available", "Unavailable", "Limited Stock", "Coming soon"],
      default: "Coming soon",
      required: true,
    },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
stockSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
