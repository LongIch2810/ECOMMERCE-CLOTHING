const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const genderSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
genderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Gender = mongoose.model("Gender", genderSchema);

module.exports = Gender;
