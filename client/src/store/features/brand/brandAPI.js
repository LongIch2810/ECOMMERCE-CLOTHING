import instanceAxios from "../../../configs/axios";

const getBrandsAPI = async () => {
  const response = await instanceAxios.get(`/brand/list`);
  return response.data;
};

const getFilterBrandsAPI = async (data) => {
  const response = await instanceAxios.post("/brand/filter", data);
  return response.data;
};

const addBrandAPI = async (data) => {
  const response = await instanceAxios.post("/brand/add-brand", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const editBrandAPI = async ({ brandId, formData }) => {
  const response = await instanceAxios.put(`/brand/edit/${brandId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const deleteBrandAPI = async (brandId) => {
  const response = await instanceAxios.delete(`/brand/delete/${brandId}`);
  return response.data;
};

const getBrandByIdAPI = async (brandId) => {
  const response = await instanceAxios.get(`/brand/get-brand/${brandId}`);
  return response.data;
};
export {
  getBrandsAPI,
  getFilterBrandsAPI,
  addBrandAPI,
  editBrandAPI,
  deleteBrandAPI,
  getBrandByIdAPI,
};
