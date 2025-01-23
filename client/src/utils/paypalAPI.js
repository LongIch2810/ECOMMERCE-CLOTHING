import axios from "../configs/axios";

const createOrder = async (products) => {
  try {
    const response = await axios.post(`/paypal/create-order`, { products });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const capturePayment = async ({ orderID, data }) => {
  try {
    console.log(data);
    const response = await axios.post(`/paypal/capture-payment`, {
      orderID,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error capturing payment:", error);
    throw error;
  }
};

export { createOrder, capturePayment };
