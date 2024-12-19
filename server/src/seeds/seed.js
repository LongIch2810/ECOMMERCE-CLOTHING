const Category = require("../models/categoryModel");
const Gender = require("../models/genderModel");
const Product = require("../models/productModel");
const Stock = require("../models/stockModel");
const Supplier = require("../models/supplierModel");
const TypeProduct = require("../models/typeProductModel");
const User = require("../models/userModel");
const countDocuments = require("../utils/countDocuments");
const seedCategory = require("./categorySeed");
const seedGender = require("./genderSeed");
const seedProduct = require("./productSeed");
const seedSupplier = require("./supplierSeed");
const seedTypeProduct = require("./typeProductSeed");
const seedUser = require("./userSeed");

const seed = async () => {
  try {
    // Kiểm tra bảng User
    if ((await countDocuments(User)) === 0) {
      console.log("Seeding Users...");
      await seedUser();
    }

    // Kiểm tra bảng Supplier
    if ((await countDocuments(Supplier)) === 0) {
      console.log("Seeding Suppliers...");
      await seedSupplier();
    }

    // Kiểm tra bảng Category
    if ((await countDocuments(Category)) === 0) {
      console.log("Seeding Categories...");
      await seedCategory();
    }

    // Kiểm tra bảng Subcategory
    if ((await countDocuments(Gender)) === 0) {
      console.log("Seeding Genders...");
      await seedGender();
    }

    // Kiểm tra bảng TypeProduct
    if ((await countDocuments(TypeProduct)) === 0) {
      console.log("Seeding TypeProducts...");
      await seedTypeProduct();
    }

    if ((await countDocuments(Product)) === 0) {
      console.log("Seeding Products...");
      await seedProduct();
    }

    console.log("Seeding process completed.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

module.exports = seed;
