const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const supplierSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
supplierSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
