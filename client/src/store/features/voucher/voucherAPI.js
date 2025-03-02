import instanceAxios from "../../../configs/axios";

const getVouchersAPI = async () => {
  const response = await instanceAxios.get("/voucher/list");
  return response.data;
};

export { getVouchersAPI };
