import instanceAxios from "../../../configs/axios";

const getCategoriesAPI = async () => {
  const response = await instanceAxios.get(`/category/list`);
  return response.data;
};

export { getCategoriesAPI };
