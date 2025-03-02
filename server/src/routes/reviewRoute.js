const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addReview,
  getReviewsByProductId,
} = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.post("/add", verifyToken, addReview);
reviewRouter.get("/:id", getReviewsByProductId);

module.exports = reviewRouter;
