const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addReview,
  getReviewsByProductId,
} = require("../controllers/reviewController");
const reviewRouter = express.Router();

//Thêm bình luận
reviewRouter.post("/add", verifyToken, addReview);

//Lấy danh sách bình luận
reviewRouter.get("/:id", getReviewsByProductId);

module.exports = reviewRouter;
