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

//Lấy danh sách phiếu nhập có điều kiện lọc
const getFilterImportReceiptsService = async ({ page = 1, limit = 5, id }) => {
  try {
    const filter = {};

    if (id) {
      filter._id = id;
    }
    const results = {};
    const skip = (page - 1) * limit;
    const importReceipts = await ImportReceipt.find(filter)
      .limit(limit)
      .select("-deleted -updatedAt -__v -products")
      .populate("supplier")
      .populate("user")
      .skip(skip);
    const total_importReceipts = await ImportReceipt.countDocuments(filter);
    const total_pages = Math.ceil(total_importReceipts / limit);
    results.total_importReceipts = total_importReceipts;
    results.total_pages = total_pages;
    results.current_page = page;
    results.importReceipts = importReceipts;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

//Lấy chi tiết phiếu lọc
const fetchImportReceiptDetailService = async (importReceiptId) => {
  try {
    const importReceipt = await ImportReceipt.findById(importReceiptId)
      .populate("products.product")
      .populate("products.color")
      .populate("supplier")
      .populate("user");
    if (!importReceipt) {
      return { SC: 404, success: false, message: "Không tìm thấy đơn hàng" };
    }
    return { SC: 200, success: true, importReceipt };
  } catch (error) {
    console.error(error);
    return { SC: 500, success: false, message: "Lỗi server" };
  }
};

module.exports = {
  addImportReceiptService,
  getFilterImportReceiptsService,
  fetchImportReceiptDetailService,
};
