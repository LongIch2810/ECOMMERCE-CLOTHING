const {
  addOrderService,
  updatePaymentStatusOrderService,
  handlePaymentCancelService,
} = require("../services/orderService");

const addOrder = async (req, res) => {
  const { id: user_id } = req.user;
  const { products, total_price, voucher, payment_method, address, shipping } =
    req.body;

  const data = {
    user_id,
    products,
    total_price,
    voucher,
    payment_method,
    address,
    shipping,
  };

  const result = await addOrderService(data);
  if (result.SC === 201 && result?.orderId) {
    return res.status(201).json({
      success: true,
      orderId: result.orderId,
      message: result.message,
    });
  }

  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const updatePaymentStatusOrder = async (req, res) => {
  const { id: order_id } = req.params;
  const result = await updatePaymentStatusOrderService({ order_id });
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const handlePaymentCancel = async (req, res) => {
  const { order_id } = req.body;
  const result = await handlePaymentCancelService({ order_id });
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = { addOrder, updatePaymentStatusOrder, handlePaymentCancel };
