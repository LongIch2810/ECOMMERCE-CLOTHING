const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { addReview, getReviews } = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.post("/add", verifyToken, addReview);
reviewRouter.get("/:id", getReviews);

module.exports = reviewRouter;
