import axios from "../../../configs/axios";
const addProductToCartAPI = async ({
  product_id,
  size,
  quantity,
  stockQuantity,
}) => {
  const response = await axios.post("/cart/add", {
    product_id,
    size,
    quantity,
    stockQuantity,
  });
  return response.data;
};

const deleteProductToCartAPI = async ({ id }) => {
  const response = await axios.delete(`/cart/delete/${id}`);
  return response.data;
};

const deleteAllProductToCartAPI = async () => {
  const response = await axios.delete(`/cart/delete-all`);
  return response.data;
};

const updateProductToCartAPI = async ({ id, quantity }) => {
  const response = await axios.put(`/cart/update/${id}`, { quantity });
  return response.data;
};

const getProductsAPI = async () => {
  const response = await axios.get("/cart");
  return response.data;
};

export {
  addProductToCartAPI,
  getProductsAPI,
  deleteProductToCartAPI,
  deleteAllProductToCartAPI,
  updateProductToCartAPI,
};
