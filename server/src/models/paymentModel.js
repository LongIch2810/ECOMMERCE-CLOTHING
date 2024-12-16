const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    payment_method: { type: String, required: true },
    payment_status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
paymentSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
