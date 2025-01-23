const { refundQuantityService } = require("../services/stockService");

const refundQuantity = async (req, res) => {
  const { product_id, quantity, size } = req.body;
  const result = await refundQuantityService({ product_id, quantity, size });
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = { refundQuantity };
