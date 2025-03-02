import instanceAxios from "../../../configs/axios";
const addProductToCartAPI = async ({
  product_id,
  size,
  quantity,
  color,
  stockQuantity,
}) => {
  const response = await instanceAxios.post("/cart/add", {
    product_id,
    size,
    quantity,
    color,
    stockQuantity,
  });
  return response.data;
};

const deleteProductToCartAPI = async ({ id }) => {
  const response = await instanceAxios.delete(`/cart/delete/${id}`);
  return response.data;
};

const deleteAllProductToCartAPI = async () => {
  const response = await instanceAxios.delete(`/cart/delete-all`);
  return response.data;
};

const updateProductToCartAPI = async ({ id, quantity }) => {
  const response = await instanceAxios.put(`/cart/update/${id}`, { quantity });
  return response.data;
};

const getProductsAPI = async () => {
  const response = await instanceAxios.get("/cart");
  return response.data;
};

export {
  addProductToCartAPI,
  getProductsAPI,
  deleteProductToCartAPI,
  deleteAllProductToCartAPI,
  updateProductToCartAPI,
};
