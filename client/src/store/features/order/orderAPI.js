import instanceAxios from "../../../configs/axios";

const addOrderAPI = async (data) => {
  const response = await instanceAxios.post("/order/add", data);
  return response.data;
};

const getOrdersByUserIdAPI = async () => {
  const response = await instanceAxios.get("/order/list");
  return response.data;
};

const getOrdersAPI = async (data) => {
  const response = await instanceAxios.post("/order/get-all", data);
  return response.data;
};

const changeStatusAPI = async ({ order_id, status }) => {
  const response = await instanceAxios.put(`/order/change-status/${order_id}`, {
    status,
  });
  return response.data;
};

const cancelOrderAPI = async ({ order_id }) => {
  const response = await instanceAxios.put(
    `/order/change-status-cancel/${order_id}`
  );
  return response.data;
};

const exportExcelAPI = async () => {
  const response = await instanceAxios.get("/order/export-excel", {
    responseType: "blob",
  });
  return response.data;
};

const fetchOrderDetailAPI = async (orderId) => {
  const response = await instanceAxios.get(`/order/get-order-id/${orderId}`);
  return response.data;
};

export {
  addOrderAPI,
  getOrdersByUserIdAPI,
  getOrdersAPI,
  changeStatusAPI,
  cancelOrderAPI,
  exportExcelAPI,
  fetchOrderDetailAPI,
};
