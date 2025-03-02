import instanceAxios from "../../../configs/axios";

const getShippingAPI = async () => {
  const response = await instanceAxios.get("/shipping/list");
  return response.data;
};

export { getShippingAPI };
