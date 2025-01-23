import axios from "../../../configs/axios";

const getShippingAPI = async () => {
  const response = await axios.get("/shipping/list");
  return response.data;
};

export { getShippingAPI };
