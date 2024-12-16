const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    star: { type: Number, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

// Kích hoạt xóa mềm với mongoose-delete
reviewSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
