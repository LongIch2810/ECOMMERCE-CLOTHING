const { addImportReceiptService } = require("../services/importReceipt");

const addImportReceipt = async (req, res) => {
  const { products, note, supplier } = req.body;

  if (!products || products.length <= 0)
    return res.status(400).json({
      success: false,
      message: "Danh sách sản phẩm không có sản phẩm !",
    });

  const total_price = products.reduce((total, product) => {
    return total + product.quantity * product.import_price;
  }, 0);

  const result = await addImportReceiptService({
    products,
    total_price,
    note,
    supplier,
  });

  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = { addImportReceipt };
