const mongoose = require("mongoose");
require("dotenv").config();
const ImportReceipt = require("../models/importReceiptModel");
const Product = require("../models/productModel");
const Supplier = require("../models/supplierModel");
const User = require("../models/userModel");
const Color = require("../models/colorModel");

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]; // Danh sách size

const seedImportReceipts = async () => {
  try {
    const supplier = await Supplier.findOne({ name: "NIKE" });
    const user = await User.findOne({ email: process.env.ADMIN_EMAIL });
    const colors = await Color.find();
    const products = await Product.find();

    if (!supplier || !user || colors.length === 0 || products.length === 0) {
      console.log(
        "❌ Cần có dữ liệu Supplier, User, Product, và Color trước khi seed."
      );
      return;
    }

    const importReceipts = [];

    // Lặp qua từng sản phẩm
    products.forEach((product) => {
      const productEntries = [];

      // Tạo tất cả biến thể (mỗi size, mỗi màu)
      sizes.forEach((size) => {
        colors.forEach((color) => {
          productEntries.push({
            product: product._id,
            size,
            quantity: 10, // Số lượng ngẫu nhiên (5 - 25)
            color: color._id,
            import_price: Math.floor(Math.random() * 50000) + 150000, // Giá nhập từ 150k - 200k
          });
        });
      });

      // Tạo phiếu nhập cho sản phẩm này
      importReceipts.push({
        supplier: supplier._id,
        products: productEntries,
        total_price: productEntries.reduce(
          (sum, p) => sum + p.quantity * p.import_price,
          0
        ),
        user: user._id,
        note: `Nhập tất cả size và màu cho sản phẩm ${product.name}`,
      });
    });

    await ImportReceipt.insertMany(importReceipts);
    console.log("✅ Seed phiếu nhập tất cả size & màu thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi seed phiếu nhập:", error);
  }
};

module.exports = seedImportReceipts;
