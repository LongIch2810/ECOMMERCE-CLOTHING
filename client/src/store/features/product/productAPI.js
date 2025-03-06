import instanceAxios from "../../../configs/axios";

const getProductsAPI = async (data) => {
  console.log(data);
  const response = await instanceAxios.post(`/product/list`, data);
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

const addProductAPI = async (data) => {
  const response = await instanceAxios.post(`/product/add-product`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const editProductAPI = async ({ productId, formData }) => {
  console.log(productId);
  const response = await instanceAxios.put(
    `/product/edit/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const deleteProductAPI = async (productId) => {
  const response = await instanceAxios.delete(`/product/delete/${productId}`);
  return response.data;
};

const getProductByIdAPI = async (productId) => {
  console.log(productId);
  const response = await instanceAxios.get(`/product/get-product/${productId}`);
  console.log(response.data);
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
  addProductAPI,
  editProductAPI,
  deleteProductAPI,
  getProductByIdAPI,
};
