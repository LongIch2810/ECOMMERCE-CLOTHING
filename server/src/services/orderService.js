const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const {
  updateStockAfterOrderService,
  refundQuantityService,
} = require("./stockService");
const sendMail = require("../configs/email");
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
        color: item.color._id,
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
      "Xác nhận đơn hàng từ DIRTY CLOTHES",
      `<p>Bạn đã đặt hàng thành công với mã đơn hàng của bạn là: <h3>${order._id}</h3></p> <h4>Vui lòng theo dõi đơn hàng để nhận hàng nhé ! <br>Cảm ơn bạn đã sử dụng dịch vụ chúng tôi !</h4> <br><br>
      --<br>
      <strong>Cửa hàng DIRTY CLOTHES</strong><br>
      Địa chỉ: ${process.env.ADMIN_ADDRESS}<br>
      Hotline: ${process.env.ADMIN_PHONE}<br>
      Email: ${process.env.ADMIN_EMAIL}
`
    );

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

const getOrdersByUserIdService = async ({ user_id }) => {
  try {
    const orders = await Order.find({ user: user_id })
      .populate("products.product")
      .populate("products.color")
      .populate("voucher")
      .populate("shipping")
      .populate("address")
      .sort({ createdAt: -1 });
    return { SC: 200, success: true, orders };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getOrdersService = async ({ page = 1, limit = 10, order_id, status }) => {
  try {
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (order_id) {
      filter._id = order_id;
    }

    const results = {};
    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .limit(limit)
      .skip(skip)
      .populate("shipping")
      .select(
        "_id total_price payment_method payment_status status createdAt shipping"
      );
    const total_orders = await Order.countDocuments(filter);
    const total_pages = Math.ceil(total_orders / limit);
    results.total_orders = total_orders;
    results.total_pages = total_pages;
    results.current_page = page;
    results.orders = orders;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const changeStatusService = async ({ order_id, status }) => {
  try {
    await Order.findByIdAndUpdate(order_id, { status });
    return {
      SC: 200,
      success: true,
      message: "Cập nhật trạng thái đơn hàng thành công !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const confirmReceivedService = async ({ order_id }) => {
  try {
    const order = await Order.findByIdAndUpdate(order_id, {
      status: "Giao hàng thành công",
    });

    if (!order) {
      return { SC: 400, success: false, message: "Đơn hàng không tồn tại !" };
    }

    if (!order.products || order.products.length === 0) {
      return {
        SC: 400,
        success: false,
        message: "Đơn hàng không có sản phẩm!",
      };
    }

    if (order.payment_method !== "paypal") {
      order.payment_status = "COMPLETED";
      await order.save();
    }

    return { SC: 200, success: true, message: "Xác nhận đã nhận hàng !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const cancelOrderService = async ({ order_id }) => {
  try {
    const order = await Order.findByIdAndUpdate(order_id, { status: "Hủy bỏ" });

    if (!order) {
      return { SC: 400, success: false, message: "Đơn hàng không tồn tại !" };
    }

    if (!order.products || order.products.length === 0) {
      return {
        SC: 400,
        success: false,
        message: "Đơn hàng không có sản phẩm!",
      };
    }

    order.payment_status = "FAILED";

    await order.save();

    const results = await Promise.all(
      order.products.map(async (item) => {
        try {
          const result = await refundQuantityService({
            product_id: item.product,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          });
          return result.success;
        } catch (error) {
          console.error(`Lỗi khi refund sản phẩm ${item.product}:`, error);
          return false; // Nếu lỗi, trả về false để không ảnh hưởng toàn bộ
        }
      })
    );

    if (results.every(Boolean)) {
      return {
        SC: 200,
        success: true,
        message: "Đơn hàng đã hủy thành công !",
      };
    }

    return {
      SC: 207,
      success: false,
      message: "Đơn hàng đã hủy nhưng có một số sản phẩm không thể hoàn trả !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalStatusOrderYearService = async ({ year }) => {
  try {
    const startOfYear = new Date(year, 0, 1); // 01/01 của năm
    const endOfYear = new Date(year, 11, 31); // 31/12 của năm
    endOfYear.setUTCHours(23, 59, 59, 999); // Đảm bảo lấy đủ dữ liệu ngày cuối cùng

    console.log(">>> startOfYear : ", startOfYear);
    console.log(">>> endOfYear : ", endOfYear);
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: "$status",
          name: { $first: "$status" },
          value: { $sum: 1 },
        },
      },
    ]);

    return { SC: 200, success: true, result };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalStatusOrderMonthService = async ({ month, year }) => {
  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    endOfMonth.setUTCHours(23, 59, 59, 999);

    console.log(">>> startOfMonth : ", startOfMonth);
    console.log(">>> endOfMonth : ", endOfMonth);
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$status",
          name: { $first: "$status" },
          value: { $sum: 1 },
        },
      },
    ]);

    return { SC: 200, success: true, result };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalStatusOrderDateService = async ({ startDate, endDate }) => {
  try {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: "$status",
          name: { $first: "$status" },
          value: { $sum: 1 },
        },
      },
    ]);

    return { SC: 200, success: true, result };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalRevenueYearService = async ({ year }) => {
  try {
    const startOfYear = new Date(year, 0, 1); // 01/01 của năm
    const endOfYear = new Date(year, 11, 31); // 31/12 của năm
    endOfYear.setUTCHours(23, 59, 59, 999); // Đảm bảo lấy đủ dữ liệu ngày cuối cùng

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
          status: "Giao hàng thành công",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          name: { $first: { $month: `$createdAt` } },
          doanhThu: { $sum: "$total_price" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const fullYearData = Array.from({ length: 12 }, (_, i) => ({
      _id: i + 1,
      name: i + 1,
      doanhThu: 0,
    }));

    result.forEach((item) => {
      fullYearData[item._id - 1].doanhThu = item.doanhThu;
    });

    return {
      SC: 200,
      success: true,
      result: fullYearData,
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalRevenueYearDetailService = async ({ year }) => {
  try {
    const startOfYear = new Date(year, 0, 1); // 01/01 của năm
    const endOfYear = new Date(year, 11, 31); // 31/12 của năm
    endOfYear.setUTCHours(23, 59, 59, 999); // Đảm bảo lấy đủ dữ liệu ngày cuối cùng

    const dataRevenueDetail = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
          status: "Giao hàng thành công",
        },
      },
      {
        $sort: { createdAt: 1 }, // Sắp xếp theo thời gian
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          total_price: 1,
        },
      },
    ]);

    const total = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lt: endOfYear,
          },

          status: "Giao hàng thành công",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total_price" },
        },
      },
    ]);

    const orders = dataRevenueDetail;
    const totalRevenue = total.length ? total[0].totalRevenue : 0;

    return {
      SC: 200,
      success: true,
      orders,
      totalRevenue,
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalRevenueMonthService = async ({ month, year }) => {
  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    endOfMonth.setUTCHours(23, 59, 59, 999);
    console.log(">>> startOfMonth : ", startOfMonth);
    console.log(">>> endOfMonth : ", endOfMonth);

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
          status: "Giao hàng thành công",
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          name: { $first: { $month: `$createdAt` } },
          doanhThu: { $sum: "$total_price" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const daysInMonth = new Date(year, month, 0).getDate();

    const fullMonthData = Array.from({ length: daysInMonth }, (_, i) => ({
      _id: i + 1,
      name: i + 1,
      doanhThu: 0,
    }));

    result.forEach((item) => {
      fullMonthData[item._id - 1].doanhThu = item.doanhThu;
    });

    return { SC: 200, success: true, result: fullMonthData };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalRevenueMonthDetailService = async ({ month, year }) => {
  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    endOfMonth.setUTCHours(23, 59, 59, 999);
    console.log(">>> startOfMonth : ", startOfMonth);
    console.log(">>> endOfMonth : ", endOfMonth);

    const dataRevenueDetail = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
          status: "Giao hàng thành công",
        },
      },
      {
        $sort: { createdAt: 1 }, // Sắp xếp theo thời gian
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          total_price: 1,
        },
      },
    ]);

    const total = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
          status: "Giao hàng thành công",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total_price" },
        },
      },
    ]);

    const orders = dataRevenueDetail;
    const totalRevenue = total.length ? total[0].totalRevenue : 0;

    console.log(">>> orders : ", orders);
    console.log(">>> totalRevenue : ", totalRevenue);

    return {
      SC: 200,
      success: true,
      orders,
      totalRevenue,
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalRevenueDateDetailService = async ({ startDate, endDate }) => {
  try {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    const dataRevenueDetail = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
          status: "Giao hàng thành công",
        },
      },
      {
        $sort: { createdAt: 1 }, // Sắp xếp theo thời gian
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          total_price: 1,
        },
      },
    ]);

    const total = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
          status: "Giao hàng thành công",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total_price" },
        },
      },
    ]);

    const orders = dataRevenueDetail;
    const totalRevenue = total.length ? total[0].totalRevenue : 0;

    console.log(">>> orders : ", orders);
    console.log(">>> totalRevenue : ", totalRevenue);

    return {
      SC: 200,
      success: true,
      orders,
      totalRevenue,
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const fetchOrderDetailService = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate("products.product")
      .populate("products.color")
      .populate("voucher")
      .populate("shipping")
      .populate("address");
    if (!order) {
      return { SC: 404, success: false, message: "Không tìm thấy đơn hàng" };
    }
    return { SC: 200, success: true, order };
  } catch (error) {
    console.error(error);
    return { SC: 500, success: false, message: "Lỗi server" };
  }
};

module.exports = {
  addOrderService,
  getOrdersByUserIdService,
  getOrdersService,
  changeStatusService,
  confirmReceivedService,
  cancelOrderService,
  statisticalStatusOrderYearService,
  statisticalStatusOrderMonthService,
  statisticalStatusOrderDateService,
  statisticalRevenueYearService,
  statisticalRevenueYearDetailService,
  statisticalRevenueMonthService,
  statisticalRevenueMonthDetailService,
  statisticalRevenueDateDetailService,
  fetchOrderDetailService,
};
