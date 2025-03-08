const Order = require("../models/orderModel");
const ImportReceipt = require("../models/importReceiptModel");

const statisticalProfitYearService = async ({ year }) => {
  try {
    const startOfYear = new Date(year, 0, 1); // 01/01 của năm
    const endOfYear = new Date(year, 11, 31); // 31/12 của năm
    endOfYear.setUTCHours(23, 59, 59, 999); // Đảm bảo lấy đủ dữ liệu ngày cuối cùng

    const total_revenue = await Order.aggregate([
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
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);

    const total_cost = await ImportReceipt.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);

    const totalRevenue = total_revenue.length ? total_revenue[0].total : 0;
    const totalCost = total_cost.length ? total_cost[0].total : 0;
    const totalProfit = totalRevenue - totalCost;
    return {
      SC: 200,
      success: true,
      totalRevenue,
      totalCost,
      totalProfit,
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalProfitMonthService = async ({ month, year }) => {
  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 1);
    endOfMonth.setUTCHours(23, 59, 59, 999);
    console.log(">>> startOfMonth : ", startOfMonth);
    console.log(">>> endOfMonth : ", endOfMonth);

    const total_revenue = await Order.aggregate([
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
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);

    const total_cost = await ImportReceipt.aggregate([
      {
        $match: {
          createdAt: {
            $gte: endOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);

    const totalRevenue = total_revenue.length ? total_revenue[0].total : 0;
    const totalCost = total_cost.length ? total_cost[0].total : 0;
    const totalProfit = totalRevenue - totalCost;
    return {
      SC: 200,
      success: true,
      totalRevenue,
      totalCost,
      totalProfit,
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const statisticalProfitDateService = async ({ startDate, endDate }) => {
  try {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    const total_revenue = await Order.aggregate([
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
          total: { $sum: "$total_price" },
        },
      },
    ]);

    const total_cost = await ImportReceipt.aggregate([
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
          _id: null,
          total: { $sum: "$total_price" },
        },
      },
    ]);

    const totalRevenue = total_revenue.length ? total_revenue[0].total : 0;
    const totalCost = total_cost.length ? total_cost[0].total : 0;
    const totalProfit = totalRevenue - totalCost;
    return {
      SC: 200,
      success: true,
      totalRevenue,
      totalCost,
      totalProfit,
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  statisticalProfitYearService,
  statisticalProfitMonthService,
  statisticalProfitDateService,
};
