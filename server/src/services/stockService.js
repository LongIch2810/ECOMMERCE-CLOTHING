const Stock = require("../models/stockModel");

const updateStockAfterOrderService = async ({ product_id, size, quantity }) => {
  try {
    const stock = await Stock.findOne({ product: product_id });
    if (!stock) {
      throw new Error("Không tìm thấy sản phẩm trong kho.");
    }

    const sizeItem = stock.sizes.find((item) => item.size === size);
    if (!sizeItem) {
      throw new Error(`Không tìm thấy kích thước ${size} trong kho.`);
    }

    if (sizeItem.quantity < quantity) {
      throw new Error(
        `Không đủ số lượng trong kho. Số lượng hiện tại: ${sizeItem.quantity}`
      );
    }

    // Giảm số lượng
    sizeItem.quantity -= quantity;

    // Cập nhật trạng thái
    if (sizeItem.quantity === 0) {
      sizeItem.status = "Hết hàng";
    } else if (sizeItem.quantity <= 5) {
      sizeItem.status = "Số lượng có hạn";
    } else {
      sizeItem.status = "Có hàng";
    }

    await stock.save();
    return { success: true, message: "Cập nhật kho thành công." };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

const refundQuantityService = async ({ product_id, quantity, size }) => {
  try {
    // Tìm sản phẩm trong kho với `product_id`
    const stock = await Stock.findOne({ product: product_id });
    if (!stock) {
      return {
        SC: 400,
        success: false,
        message: "Sản phẩm không tồn tại trong kho.",
      };
    }

    // Tìm kích thước phù hợp trong danh sách kích thước
    const sizeIndex = stock.sizes.findIndex((item) => item.size === size);
    if (sizeIndex === -1) {
      return {
        SC: 400,
        success: false,
        message: "Kích thước sản phẩm không tồn tại.",
      };
    }

    // Hoàn trả số lượng
    stock.sizes[sizeIndex].quantity += quantity;

    // Cập nhật trạng thái
    if (stock.sizes[sizeIndex].quantity <= 5) {
      stock.sizes[sizeIndex].status = "Số lượng có hạn";
    } else {
      stock.sizes[sizeIndex].status = "Có hàng";
    }

    // Lưu thay đổi
    await stock.save();

    return { SC: 200, success: true, message: "Hoàn trả số lượng thành công." };
  } catch (error) {
    console.error(error);
    return {
      SC: 500,
      success: false,
      message: error.message,
    };
  }
};

module.exports = { updateStockAfterOrderService, refundQuantityService };
