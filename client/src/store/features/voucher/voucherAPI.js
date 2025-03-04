import instanceAxios from "../../../configs/axios";

const getVouchersAPI = async () => {
  const response = await instanceAxios.get("/voucher/list");
  return response.data;
};

const addVoucherAPI = async (data) => {
  const response = await instanceAxios.post("/voucher/add-voucher", data);
  return response.data;
};

export { getVouchersAPI, addVoucherAPI };
