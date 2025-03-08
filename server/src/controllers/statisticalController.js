const {
  statisticalProfitYearService,
  statisticalProfitMonthService,
  statisticalProfitDateService,
} = require("../services/statisticalService");

const statisticalProfitYear = async (req, res) => {
  const { year } = req.body;
  const data = await statisticalProfitYearService({ year: Number(year) });
  if (data.SC === 200) {
    return res.status(200).json({
      success: data.success,
      totalRevenue: data.totalRevenue,
      totalCost: data.totalCost,
      totalProfit: data.totalProfit,
    });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const statisticalProfitMonth = async (req, res) => {
  const { month, year } = req.body;
  const data = await statisticalProfitMonthService({ month, year });
  if (data.SC === 200) {
    return res.status(200).json({
      success: data.success,
      totalRevenue: data.totalRevenue,
      totalCost: data.totalCost,
      totalProfit: data.totalProfit,
    });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const statisticalProfitDate = async (req, res) => {
  const { startDate, endDate } = req.body;
  const data = await statisticalProfitDateService({ startDate, endDate });
  if (data.SC === 200) {
    return res.status(200).json({
      success: data.success,
      totalRevenue: data.totalRevenue,
      totalCost: data.totalCost,
      totalProfit: data.totalProfit,
    });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = {
  statisticalProfitYear,
  statisticalProfitMonth,
  statisticalProfitDate,
};
