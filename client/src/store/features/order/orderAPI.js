import axios from "../../../configs/axios";

const addOrderAPI = async (data) => {
  const response = await axios.post("/order/add", data);
  return response.data;
};

const updatePaymentStatusOrderAPI = async ({ order_id }) => {
  const response = await axios.put(`/order/update-payment-status/${order_id}`);
  return response.data;
};

const handlePaymentCancelAPI = async ({ order_id }) => {
  const response = await axios.post("/order/refund", { order_id });
  return response.data;
};

export { addOrderAPI, updatePaymentStatusOrderAPI, handlePaymentCancelAPI };
