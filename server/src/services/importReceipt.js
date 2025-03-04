const ImportReceipt = require("../models/importReceiptModel");
const Stock = require("../models/stockModel");

const addImportReceiptService = async (data) => {
  try {
    const { products } = data;
    const newImportReceipt = new ImportReceipt(data);
    await newImportReceipt.save();
    // Cập nhật Stock từ danh sách sản phẩm nhập
    for (const item of products) {
      const { product, quantity, color } = item;

      // Tìm stock của sản phẩm đó
      let stock = await Stock.findOne({ product });

      if (stock) {
        // Kiểm tra nếu có đúng màu sắc và size đó trong stock chưa
        let sizeIndex = stock.sizes.findIndex(
          (s) => s.size === item.size && s.color.equals(color)
        );

        if (sizeIndex !== -1) {
          // Cập nhật số lượng
          stock.sizes[sizeIndex].quantity += quantity;
        } else {
          // Nếu chưa có, thêm size mới vào
          stock.sizes.push({
            size: item.size,
            quantity,
            color,
            status: "Có hàng",
          });
        }
      } else {
        // Nếu chưa có stock cho sản phẩm này, tạo mới
        stock = new Stock({
          product,
          sizes: [
            {
              size: item.size,
              quantity,
              color,
              status: "Có hàng",
            },
          ],
        });
      }

      // Lưu thay đổi vào database
      await stock.save();
    }
    return { SC: 201, success: true, message: "Nhập hàng thành công !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = { addImportReceiptService };
