import instanceAxios from "../../../configs/axios";

const getGendersAPI = async () => {
  const response = await instanceAxios.get(`/gender/list`);
  return response.data;
};

export { getGendersAPI };
