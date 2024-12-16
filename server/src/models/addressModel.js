const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    number: { type: String, required: true },
    street: { type: String, required: true },
    City: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
addressSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
