const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const typeProductSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
typeProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const TypeProduct = mongoose.model("TypeProduct", typeProductSchema);

module.exports = TypeProduct;
