import instanceAxios from "../../../configs/axios";

const getSuppliersAPI = async () => {
  const response = await instanceAxios.get(`/supplier/list`);
  return response.data;
};

const getFilterSuppliersAPI = async (data) => {
  const response = await instanceAxios.post(`/supplier/get-all`, data);
  return response.data;
};

const addSupplierAPI = async (data) => {
  const response = await instanceAxios.post(`/supplier/add-supplier`, data);
  return response.data;
};

export { getSuppliersAPI, addSupplierAPI, getFilterSuppliersAPI };
