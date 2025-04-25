const Stock = require("../models/stockModel");

const updateStockAfterOrderService = async ({
  product_id,
  color,
  size,
  quantity,
}) => {
  try {
    const stock = await Stock.findOne({ product: product_id });
    if (!stock) {
      throw new Error("Không tìm thấy sản phẩm trong kho.");
    }

    console.log(">>> stock : ", stock);

    const sizeItem = stock.sizes.find(
      (item) => item.size === size && item.color.equals(color)
    );

    if (!sizeItem) {
      throw new Error(
        `Không tìm thấy kích thước ${size} có màu ${color} trong kho.`
      );
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

const refundQuantityService = async ({ product_id, quantity, size, color }) => {
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
    const sizeIndex = stock.sizes.findIndex(
      (item) => item.size === size && item.color.equals(color)
    );
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

const statisticalInStockService = async ({ page = 1, limit = 50 }) => {
  try {
    const skip = (page - 1) * limit;

    const stockData = await Stock.aggregate([
      { $unwind: "$sizes" },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $lookup: {
          from: "colors",
          localField: "sizes.color",
          foreignField: "_id",
          as: "colorInfo",
        },
      },
      { $unwind: "$colorInfo" },
      {
        $project: {
          _id: 0,
          productName: "$productInfo.name",
          size: "$sizes.size",
          color: "$colorInfo.name",
          quantity: "$sizes.quantity",
        },
      },
      { $sort: { productName: 1, size: 1, color: 1 } }, // Sắp xếp
      { $skip: skip }, // Bỏ qua (page - 1) * limit bản ghi
      { $limit: limit }, // Giới hạn số bản ghi trên mỗi trang
    ]);

    const totalItems = await Stock.aggregate([
      { $unwind: "$sizes" },
      { $count: "total" },
    ]);

    console.log(totalItems);

    const current_page = page;
    const total_pages = Math.ceil((totalItems[0]?.total || 0) / limit);
    const total_items = totalItems[0]?.total || 0;

    console.log(total_pages);
    console.log(total_items);

    return {
      SC: 200,
      success: true,
      stock: stockData,
      current_page,
      total_items,
    };
  } catch (error) {
    console.error(error);
    return {
      SC: 500,
      success: false,
      message: error.message,
    };
  }
};

module.exports = {
  updateStockAfterOrderService,
  refundQuantityService,
  statisticalInStockService,
};
