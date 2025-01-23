const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Stock = require("../models/stockModel");
const Order = require("../models/orderModel");
const { ordersController } = require("../configs/paypal");
const {
  updateStockAfterOrderService,
  refundQuantityService,
} = require("./stockService");
const addOrderService = async (data) => {
  const {
    user_id,
    products,
    total_price,
    voucher,
    payment_method,
    address,
    shipping,
  } = data;

  try {
    const order = await Order.create({
      products: products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
      })),
      total_price,
      voucher,
      payment_method,
      payment_status: "PENDING",
      address,
      shipping,
      user: user_id,
    });

    await order.save();

    for (const item of order.products) {
      await updateStockAfterOrderService({
        product_id: item.product,
        size: item.size,
        quantity: item.quantity,
      });
    }

    return {
      SC: 201,
      success: true,
      orderId: order._id,
      message: "Đặt hàng thành công. Thanh toán khi nhận hàng !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const updatePaymentStatusOrderService = async ({
  order_id,
  payment_status = "Đã thanh toán",
}) => {
  try {
    const order = await Order.findById(order_id);
    if (!order) {
      return { SC: 404, success: false, message: "Đơn hàng không tồn tại !" };
    }
    order.payment_status = payment_status;
    await order.save();
    return { SC: 200, success: true, message: "Đơn hàng đã thanh toán" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const handlePaymentCancelService = async ({ order_id }) => {
  try {
    const order = await Order.findById(order_id);
    if (!order) {
      return { SC: 400, success: false, message: "Đơn hàng không tồn tại !" };
    }
    console.log(order.products);
    order.status = "Hủy bỏ";
    for (const item of order.products) {
      await refundQuantityService({
        product_id: item.product,
        size: item.size,
        quantity: item.quantity,
      });
    }
    await order.save();
    await order.delete();
    return {
      SC: 200,
      success: true,
      message: "ĐƠn hàng được hủy bỏ và hoàn trả số lượng sản phẩm !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  addOrderService,
  updatePaymentStatusOrderService,
  handlePaymentCancelService,
};
