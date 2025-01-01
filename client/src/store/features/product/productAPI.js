import axios from "../../../configs/axios";

const getProductsAPI = async ({ page, limit }) => {
  const response = await axios.get(`/product/list?page=${page}&limit=${limit}`);
  return response.data;
};

const getMenProductsAPI = async () => {
  const response = await axios.get(`/product/gender/men`);
  return response.data;
};

const getWomenProductsAPI = async () => {
  const response = await axios.get(`/product/gender/women`);
  return response.data;
};

const getRelatedProductsAPI = async ({ id }) => {
  const response = await axios.get(`/product/related-products/${id}`);
  return response.data;
};

const getProductDetailAPI = async ({ id }) => {
  const response = await axios.get(`/product/${id}`);
  return response.data;
};

export {
  getProductsAPI,
  getMenProductsAPI,
  getWomenProductsAPI,
  getRelatedProductsAPI,
  getProductDetailAPI,
};
