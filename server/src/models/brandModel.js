const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    logo: { type: String, default: "" },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
brandSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
