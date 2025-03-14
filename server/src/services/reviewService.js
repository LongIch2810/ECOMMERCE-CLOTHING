const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const addReviewService = async ({ user_id, star, content, product_id }) => {
  try {
    const product = await Product.findById(product_id);
    if (!product)
      return { SC: 404, success: false, message: "Sản phẩm không tồn tại !" };
    const review = new Review({
      star,
      content,
      user: user_id,
      product: product_id,
    });
    await review.save();

    const reviews = await Review.find({ product: product_id });

    const totalReview = reviews.length;

    const totalStar = reviews.reduce((total, review) => {
      return total + review.star;
    }, 0);

    const averageReview = totalStar / totalReview;

    product.averageReview = averageReview;
    await product.save();

    return {
      SC: 201,
      success: true,
      message: "Bạn đã đánh giá sản phẩm thành công",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getReviewsByProductIdService = async ({ product_id }) => {
  try {
    const product = await Product.findById(product_id);
    if (!product)
      return { SC: 404, success: false, message: "Sản phẩm không tồn tại !" };
    const reviews = await Review.find({ product: product_id })
      .populate("user")
      .sort({ createdAt: -1 });
    return { SC: 200, success: true, reviews };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = { addReviewService, getReviewsByProductIdService };
