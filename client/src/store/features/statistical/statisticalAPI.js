import instanceAxios from "../../../configs/axios";

const statisticalStatusOrderYearAPI = async (data) => {
  const response = await instanceAxios.post(
    "/order/statistical-status-year",
    data
  );
  return response.data;
};

const statisticalStatusOrderMonthAPI = async (data) => {
  const response = await instanceAxios.post(
    "/order/statistical-status-month",
    data
  );
  return response.data;
};

const statisticalStatusOrderDateAPI = async (data) => {
  const response = await instanceAxios.post(
    "/order/statistical-status-date",
    data
  );
  return response.data;
};

const statisticalRevenueYearAPI = async (data) => {
  const response = await instanceAxios.post(
    "/order/statistical-revenue-year",
    data
  );
  return response.data;
};

const statisticalRevenueMonthAPI = async (data) => {
  const response = await instanceAxios.post(
    "/order/statistical-revenue-month",
    data
  );
  return response.data;
};

const statisticalInStockAPI = async (data) => {
  const response = await instanceAxios.post(
    "/stock/statistical-in-stock",
    data
  );
  return response.data;
};

export {
  statisticalStatusOrderYearAPI,
  statisticalStatusOrderDateAPI,
  statisticalStatusOrderMonthAPI,
  statisticalRevenueYearAPI,
  statisticalRevenueMonthAPI,
  statisticalInStockAPI,
};
