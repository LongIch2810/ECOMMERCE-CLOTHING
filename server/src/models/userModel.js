const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Customer", "Admin"],
      default: "Customer",
      required: true,
    },
    phone: { type: String, required: true, unique: true },
    vouchers: [
      {
        voucher: {
          type: mongoose.Types.ObjectId,
          ref: "Voucher",
          required: true,
        },
        status: { type: String, enum: ["Used", "Unused"], required: true },
        date_used: { type: Date, default: null },
      },
    ],
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

const User = mongoose.model("User", userSchema);

module.exports = User;
