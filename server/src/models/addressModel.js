const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    fullname: { type: String, required: true },
    addressDetail: { type: String, required: true },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
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
