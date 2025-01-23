import axios from "../../../configs/axios";

const getUserInfoAPI = async () => {
  const response = await axios.get("/user/info");
  console.log(response);
  return response?.data;
};

const saveVoucherAPI = async ({ voucher_id }) => {
  const response = await axios.post("/user/save-voucher", { voucher_id });
  return response?.data;
};

const getVoucherAPI = async ({ voucher_id }) => {
  console.log(voucher_id);
  const response = await axios.get(`/user/voucher-info/${voucher_id}`);
  return response?.data;
};

export { getUserInfoAPI, saveVoucherAPI, getVoucherAPI };
