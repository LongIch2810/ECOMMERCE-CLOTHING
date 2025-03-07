import instanceAxios from "../../../configs/axios";

const getVouchersAPI = async () => {
  const response = await instanceAxios.get("/voucher/list");
  return response.data;
};

const getFilterVouchersAPI = async (data) => {
  const response = await instanceAxios.post("/voucher/filter", data);
  return response.data;
};

const addVoucherAPI = async (data) => {
  const response = await instanceAxios.post("/voucher/add-voucher", data);
  return response.data;
};

const editVoucherAPI = async ({
  voucherId,
  title,
  number_of_use,
  code,
  description,
  end_date,
  unit,
  value,
  max_discount,
  min_order_price,
}) => {
  const response = await instanceAxios.put(`/voucher/edit/${voucherId}`, {
    title,
    number_of_use,
    code,
    description,
    end_date,
    unit,
    value,
    max_discount,
    min_order_price,
  });
  return response.data;
};

const deleteVoucherAPI = async (voucherId) => {
  const response = await instanceAxios.delete(`/voucher/delete/${voucherId}`);
  return response.data;
};

const getVoucherByIdAPI = async (voucherId) => {
  const response = await instanceAxios.get(`/voucher/get-voucher/${voucherId}`);
  return response.data;
};

export {
  getVouchersAPI,
  addVoucherAPI,
  getFilterVouchersAPI,
  editVoucherAPI,
  deleteVoucherAPI,
  getVoucherByIdAPI,
};
