import instanceAxios from "../../../configs/axios";

const getProductsAPI = async ({ page, limit }) => {
  const response = await instanceAxios.get(
    `/product/list?page=${page}&limit=${limit}`
  );
  return response.data;
};

const getFilterProductsAPI = async (data) => {
  const response = await instanceAxios.post("/product/list/filter", data);
  return response.data;
};

const getMenProductsAPI = async () => {
  const response = await instanceAxios.get(`/product/gender/men`);
  return response.data;
};

const getWomenProductsAPI = async () => {
  const response = await instanceAxios.get(`/product/gender/women`);
  return response.data;
};

const getRelatedProductsAPI = async ({ id }) => {
  const response = await instanceAxios.get(`/product/related-products/${id}`);
  return response.data;
};

const getProductDetailAPI = async ({ id }) => {
  const response = await instanceAxios.get(`/product/${id}`);
  return response.data;
};

const getMaxPriceAPI = async () => {
  const response = await instanceAxios.get(`/product/max-price`);
  return response.data;
};

const getMinPriceAPI = async () => {
  const response = await instanceAxios.get(`/product/min-price`);
  return response.data;
};

export {
  getProductsAPI,
  getFilterProductsAPI,
  getMenProductsAPI,
  getWomenProductsAPI,
  getRelatedProductsAPI,
  getProductDetailAPI,
  getMaxPriceAPI,
  getMinPriceAPI,
};
