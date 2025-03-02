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

export { getBrandsAPI, getFilterBrandsAPI, addBrandAPI };
