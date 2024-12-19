require("dotenv").config();
const Category = require("../models/categoryModel");
const generateSlug = require("../utils/generateSlug");

const categories = [
  {
    name: "Áo",
    slug: generateSlug("Áo"),
  },
  {
    name: "Quần",
    slug: generateSlug("Quần"),
  },
  {
    name: "Váy",
    slug: generateSlug("Váy"),
  },
];

const seedCategory = async () => {
  try {
    const addCategories = categories.map(async (category) => {
      const newCategory = await Category.create(category);
      return await newCategory.save();
    });

    const results = await Promise.all(addCategories);
    if (results.length > 0) {
      console.log("Added categories successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedCategory;
