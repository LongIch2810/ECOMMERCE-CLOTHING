const express = require("express");
const { getCategories } = require("../controllers/categoryController");

const categoryRouter = express.Router();

//Lấy danh sách các danh mục
categoryRouter.get("/list", getCategories);

module.exports = categoryRouter;
