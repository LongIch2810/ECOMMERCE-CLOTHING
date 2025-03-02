const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const colorSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    hexCode: { type: String, required: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
colorSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;
