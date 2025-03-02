const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const otpSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
      expires: 600, // TTL index tự động xóa khi quá 10 phút
    },
  },
  { timestamps: true }
);

otpSchema.pre("save", async function (next) {
  if (this.isModified("code")) {
    const salt = await bcrypt.genSalt(10);
    this.code = await bcrypt.hash(this.code, salt);
  }
  next();
});

otpSchema.methods.matchOtp = async function (otp) {
  return await bcrypt.compare(otp, this.code);
};

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
