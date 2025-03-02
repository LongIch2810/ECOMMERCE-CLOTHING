const express = require("express");
const { getCategories } = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter.get("/list", getCategories);

module.exports = categoryRouter;
