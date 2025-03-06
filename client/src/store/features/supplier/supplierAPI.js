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

const editSupplierAPI = async ({ supplierId, name, email, description }) => {
  const response = await instanceAxios.put(`/supplier/edit/${supplierId}`, {
    name,
    email,
    description,
  });
  return response.data;
};

const deleteSupplierAPI = async (supplierId) => {
  const response = await instanceAxios.delete(`/supplier/delete/${supplierId}`);
  return response.data;
};

const getSupplierByIdAPI = async (supplierId) => {
  const response = await instanceAxios.get(
    `/supplier/get-supplier/${supplierId}`
  );
  return response.data;
};

export {
  getSuppliersAPI,
  addSupplierAPI,
  getFilterSuppliersAPI,
  editSupplierAPI,
  deleteSupplierAPI,
  getSupplierByIdAPI,
};
