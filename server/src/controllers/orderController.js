const {
  addOrderService,
  getOrdersByUserIdService,
  getOrdersService,
  changeStatusService,
  cancelOrderService,
  statisticalRevenueYearService,
  statisticalRevenueMonthService,
  statisticalStatusOrderYearService,
  statisticalStatusOrderMonthService,
  statisticalStatusOrderDateService,
  fetchOrderDetailService,
} = require("../services/orderService");

const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const Order = require("../models/orderModel");

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

const getOrdersByUserId = async (req, res) => {
  const { id: user_id } = req.user;
  const result = await getOrdersByUserIdService({ user_id });
  if (result.SC === 200 && result?.orders) {
    return res.status(200).json({ success: true, orders: result.orders });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const getOrders = async (req, res) => {
  const { page, limit, order_id, status } = req.body;
  const data = await getOrdersService({
    page,
    limit,
    order_id,
    status,
  });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const changeStatus = async (req, res) => {
  const { id: order_id } = req.params;
  const { status } = req.body;
  if (!order_id) {
    return res
      .status(404)
      .json({ success: false, message: "Đơn hàng không tồn tại !" });
  }
  const data = await changeStatusService({ order_id, status });
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const changeStatusCancel = async (req, res) => {
  const { id: order_id } = req.params;
  if (!order_id) {
    return res
      .status(404)
      .json({ success: false, message: "Đơn hàng không tồn tại !" });
  }
  const data = await cancelOrderService({ order_id });
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const statisticalStatusOrderYear = async (req, res) => {
  const { year } = req.body;
  const data = await statisticalStatusOrderYearService({ year });
  if (data.SC === 200 && data?.result) {
    return res.status(200).json({ success: true, dataOrders: data.result });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const statisticalStatusOrderMonth = async (req, res) => {
  const { month, year } = req.body;
  const data = await statisticalStatusOrderMonthService({ month, year });
  if (data.SC === 200 && data?.result) {
    return res.status(200).json({ success: true, dataOrders: data.result });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const statisticalStatusOrderDate = async (req, res) => {
  const { startDate, endDate } = req.body;
  const data = await statisticalStatusOrderDateService({ startDate, endDate });
  if (data.SC === 200 && data?.result) {
    return res.status(200).json({ success: true, dataOrders: data.result });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const statisticalRevenueYear = async (req, res) => {
  const { year } = req.body;
  const data = await statisticalRevenueYearService({ year: Number(year) });
  if (data.SC === 200 && data?.result) {
    return res.status(200).json({ success: true, dataRevenue: data.result });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const statisticalRevenueMonth = async (req, res) => {
  const { month, year } = req.body;
  const data = await statisticalRevenueMonthService({ month, year });
  if (data.SC === 200 && data?.result) {
    return res.status(200).json({ success: true, dataRevenue: data.result });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const exportExcel = async (req, res) => {
  const orders = await Order.find({});

  if (!orders || orders.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Không có dữ liệu đơn hàng để xuất Excel",
    });
  }

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách đơn hàng");

    worksheet.columns = Object.keys(orders[0]._doc).map((item) => ({
      header: item.toUpperCase(),
      key: item,
      width: 30,
    }));

    orders.forEach((item) => worksheet.addRow(item.toObject()));

    const filePath = path.join(__dirname, "orders.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, "orders.xlsx", (err) => {
      if (err) {
        console.error("Lỗi tải file:", err);
        res
          .status(500)
          .json({ success: false, message: "Lỗi khi tải file Excel" });
      }
      // Xóa file sau khi gửi thành công
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error("Lỗi xóa file:", unlinkErr);
      });
    });
  } catch (error) {
    console.error("Lỗi xuất Excel:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const fetchOrderDetail = async (req, res) => {
  const { orderId } = req.params;

  console.log(orderId);
  const result = await fetchOrderDetailService(orderId);

  if (result.SC === 200 && result?.order) {
    return res
      .status(200)
      .json({ success: result.success, order: result.order });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = {
  addOrder,
  getOrdersByUserId,
  getOrders,
  changeStatus,
  changeStatusCancel,
  statisticalStatusOrderYear,
  statisticalStatusOrderMonth,
  statisticalStatusOrderDate,
  statisticalRevenueYear,
  statisticalRevenueMonth,
  exportExcel,
  fetchOrderDetail,
};
