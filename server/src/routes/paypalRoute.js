const express = require("express");
const { ApiError } = require("@paypal/paypal-server-sdk");
const { ordersController } = require("../configs/paypal"); // Import PayPal client config
const convertVNDToUSD = require("../utils/convertVNDToUSD");
const verifyToken = require("../middlewares/verifyToken");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const { updateStockAfterOrderService } = require("../services/stockService");

const paypalRouter = express.Router();

const createOrder = async (products) => {
  const total_price = await convertVNDToUSD(
    products?.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0)
  );
  const collect = {
    body: {
      intent: "CAPTURE",
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: total_price.toString(),
          },
        },
      ],
    },
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCreate(
      collect
    );
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

// Route tạo đơn hàng mới
paypalRouter.post("/create-order", verifyToken, async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { products } = req.body;
    console.log(products);
    const { jsonResponse, httpStatusCode } = await createOrder(products);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

const captureOrder = async (orderID) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCapture(
      collect
    );
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
  }
};

paypalRouter.post("/capture-payment", verifyToken, async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const { orderID, data } = req.body;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    if (jsonResponse.status === "COMPLETED") {
      const order = await Order.create({
        products: data.products.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
        })),
        total_price: data?.total_price,
        voucher: data?.voucher,
        payment_method: data?.payment_method,
        payment_status: jsonResponse.status,
        address: data?.address,
        shipping: data?.shipping,
        user: user_id,
      });

      await order.save();

      const cart = await Cart.findOne({ user: user_id });
      cart.products = [];
      await cart.save();

      for (const item of order.products) {
        await updateStockAfterOrderService({
          product_id: item.product,
          size: item.size,
          quantity: item.quantity,
        });
      }
      return res.status(httpStatusCode).json({
        success: true,
        message: "Đặt hàng và thanh toán đơn hàng thành công !",
        jsonResponse,
      });
    }
    return res.status(400).json({ message: "Payment not completed." });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

module.exports = paypalRouter;
