const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const subcategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
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
subcategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
