const { getShippingService } = require("../services/shippingService");

const getShipping = async (req, res) => {
  const data = await getShippingService();
  if (data.SC === 200 && data?.shipping) {
    return res.status(200).json({ success: true, shipping: data.shipping });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = { getShipping };
