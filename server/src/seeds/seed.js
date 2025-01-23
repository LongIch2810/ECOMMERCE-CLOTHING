const Category = require("../models/categoryModel");
const Gender = require("../models/genderModel");
const Product = require("../models/productModel");
const Shipping = require("../models/shippingModel");
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
const seedShipping = require("./shippingSeed");
const Voucher = require("../models/voucherModel");
const seedVoucher = require("./voucherSeed");

const seed = async () => {
  try {
    // Kiểm tra collection User
    if ((await countDocuments(User)) === 0) {
      console.log("Seeding Users...");
      await seedUser();
    }

    // Kiểm tra collection Supplier
    if ((await countDocuments(Supplier)) === 0) {
      console.log("Seeding Suppliers...");
      await seedSupplier();
    }

    // Kiểm tra collection Category
    if ((await countDocuments(Category)) === 0) {
      console.log("Seeding Categories...");
      await seedCategory();
    }

    // Kiểm tra collection Subcategory
    if ((await countDocuments(Gender)) === 0) {
      console.log("Seeding Genders...");
      await seedGender();
    }

    // Kiểm tra collection TypeProduct
    if ((await countDocuments(TypeProduct)) === 0) {
      console.log("Seeding TypeProducts...");
      await seedTypeProduct();
    }

    // Kiểm tra collection Product
    if ((await countDocuments(Product)) === 0) {
      console.log("Seeding Products...");
      await seedProduct();
    }

    // Kiểm tra collection Shipping
    if ((await countDocuments(Shipping)) === 0) {
      console.log("Seeding Shipping...");
      await seedShipping();
    }

    if ((await countDocuments(Voucher)) === 0) {
      console.log("Seeding Vouchers...");
      await seedVoucher();
    }

    console.log("Seeding process completed.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

module.exports = seed;
