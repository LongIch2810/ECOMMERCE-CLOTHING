import instanceAxios from "../../../configs/axios";

const getTypeProductsAPI = async () => {
  const response = await instanceAxios.get(`/type-product/list`);
  return response.data;
};

const getFilterTypeProductsAPI = async (data) => {
  const response = await instanceAxios.post("/type-product/filter", data);
  return response.data;
};

const addTypeProductAPI = async (data) => {
  const response = await instanceAxios.post(
    "/type-product/add-type-product",
    data
  );
  return response.data;
};

const editTypeProductAPI = async ({ typeProductId, name, category_id }) => {
  const response = await instanceAxios.put(
    `/type-product/edit/${typeProductId}`,
    { name, category_id }
  );
  return response.data;
};

const deleteTypeProductAPI = async (typeProductId) => {
  const response = await instanceAxios.delete(
    `/type-product/delete/${typeProductId}`
  );
  return response.data;
};

const getTypeProductByIdAPI = async (typeProductId) => {
  const response = await instanceAxios.get(
    `/type-product/get-type-product/${typeProductId}`
  );
  return response.data;
};
export {
  getTypeProductsAPI,
  getFilterTypeProductsAPI,
  addTypeProductAPI,
  editTypeProductAPI,
  deleteTypeProductAPI,
  getTypeProductByIdAPI,
};
