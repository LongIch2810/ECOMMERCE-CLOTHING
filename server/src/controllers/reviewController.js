const {
  addReviewService,
  getReviewsService,
} = require("../services/reviewService");

const addReview = async (req, res) => {
  const { id: user_id } = req.user;
  const { star, content, product_id } = req.body;
  if (star < 0) {
    return res.status(400).json({ message: "Vui lòng đánh giá sản phẩm !" });
  }

  if (!content)
    return res
      .status(400)
      .json({ message: "Vui lòng để lại lời bình luận sản phẩm !" });

  const data = await addReviewService({ user_id, star, content, product_id });

  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getReviews = async (req, res) => {
  const { id: product_id } = req.params;
  if (!product_id) {
    return res
      .status(400)
      .json({ message: "Mã sản phẩm không được để trống !" });
  }
  const data = await getReviewsService({ product_id });
  if (data.SC === 200 && data?.reviews) {
    return res.status(200).json({ success: true, reviews: data.reviews });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = { addReview, getReviews };
