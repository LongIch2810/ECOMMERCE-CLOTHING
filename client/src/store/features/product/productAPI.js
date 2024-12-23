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

export { getProductsAPI, getMenProductsAPI, getWomenProductsAPI };
