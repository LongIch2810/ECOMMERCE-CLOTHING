const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    avatar: {
      type: "string",
      default:
        "https://res.cloudinary.com/dbfat0hl6/image/upload/v1737709354/user_egjqgv.jpg",
    },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Customer", "Admin"],
      default: "Customer",
    },
    phone: { type: String, default: "" },
    vouchers: {
      type: [
        {
          voucher: {
            type: mongoose.Types.ObjectId,
            ref: "Voucher",
            required: true,
          },
          status: {
            type: String,
            enum: ["Đã sử dụng", "Chưa sử dụng"],
            default: "Chưa sử dụng",
            required: true,
          },
          date_used: { type: Date, default: null },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Kích hoạt xóa mềm với mongoose-delete
userSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

const User = mongoose.model("User", userSchema);

module.exports = User;
