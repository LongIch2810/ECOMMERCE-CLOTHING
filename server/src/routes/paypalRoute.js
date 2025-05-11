const express = require("express");
const { ApiError } = require("@paypal/paypal-server-sdk");
const { ordersController } = require("../configs/paypal"); // Import PayPal client config
const convertVNDToUSD = require("../utils/convertVNDToUSD");
const verifyToken = require("../middlewares/verifyToken");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const { updateStockAfterOrderService } = require("../services/stockService");
const User = require("../models/userModel");
const sendMail = require("../configs/email");

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

//Route xác nhận thanh toán
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
          color: item.color._id,
          size: item.size,
        })),
        total_price: data?.total_price,
        voucher: data?.voucher || null,
        payment_method: data?.payment_method,
        payment_status: jsonResponse.status,
        address: data?.address,
        shipping: data?.shipping,
        user: user_id,
      });

      await order.save();

      for (const item of order.products) {
        await updateStockAfterOrderService({
          product_id: item.product,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        });
      }

      const cart = await Cart.findOne({ user: user_id });
      cart.products = [];
      await cart.save();

      const user = await User.findById(user_id);

      if (data?.voucher) {
        const index = user.vouchers.findIndex((item) =>
          item.voucher.equals(data.voucher)
        );

        if (index !== -1) {
          user.vouchers[index].status = "Đã sử dụng";
          await user.save();
        }
      }

      await sendMail(
        user.email,
        "DIRTY CLOTHES - Đơn hàng của bạn đã được xác nhận!",
        `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <p>Xin chào,</p>
            <p>Bạn đã đặt hàng thành công với mã đơn hàng của bạn là: <strong>${order._id}</strong></p>
            <p>Vui lòng theo dõi đơn hàng để nhận hàng nhé! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
            <hr>
            <p><strong>DIRTY CLOTHES</strong></p>
            <p>Địa chỉ: ${process.env.ADMIN_ADDRESS}</p>
            <p>Hotline: ${process.env.ADMIN_PHONE}</p>
            <p>Email: ${process.env.ADMIN_EMAIL}</p>
        </div>`
      );

      return res.status(httpStatusCode).json({
        success: true,
        message: "Đặt hàng và thanh toán đơn hàng thành công !",
        jsonResponse,
      });
    }
    return res
      .status(400)
      .json({ success: false, message: "Payment not completed." });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

module.exports = paypalRouter;
