const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
categorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
