const express = require("express");
const { getProducts } = require("../controllers/productController");
const productRouter = express.Router();

productRouter.get("/:genderSlug", getProducts);

module.exports = productRouter;
