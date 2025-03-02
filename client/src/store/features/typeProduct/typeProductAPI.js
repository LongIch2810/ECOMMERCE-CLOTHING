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

export { getTypeProductsAPI, getFilterTypeProductsAPI, addTypeProductAPI };
