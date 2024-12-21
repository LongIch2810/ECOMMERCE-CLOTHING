import axios from "../../../configs/axios";

const getProductsAPI = async ({ slug, page, limit }) => {
  const response = await axios.get(
    `/product/${slug}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export { getProductsAPI };
