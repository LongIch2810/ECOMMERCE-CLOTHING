const {
  refundQuantityService,
  statisticalInStockService,
} = require("../services/stockService");

const refundQuantity = async (req, res) => {
  const { product_id, quantity, size } = req.body;
  const result = await refundQuantityService({ product_id, quantity, size });
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const statisticalInStock = async (req, res) => {
  const { page, limit } = req.body;
  console.log(page, limit);
  const result = await statisticalInStockService({ page, limit });

  if (result.SC === 200 && result?.stock) {
    return res.status(200).json({
      success: result.success,
      stock: result.stock,
      current_page: result.current_page,
      total_items: result.total_items,
    });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = { refundQuantity, statisticalInStock };
