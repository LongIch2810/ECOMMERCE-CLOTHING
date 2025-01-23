import axios from "../../../configs/axios";

const getVouchersAPI = async () => {
  const response = await axios.get("/voucher/list");
  return response.data;
};

export { getVouchersAPI };
