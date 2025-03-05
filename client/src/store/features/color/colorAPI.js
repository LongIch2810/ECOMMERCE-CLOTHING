import instanceAxios from "../../../configs/axios";

const getColorsAPI = async () => {
  const response = await instanceAxios.get(`/color/list`);
  return response.data;
};

const getFilterColorsAPI = async (data) => {
  const response = await instanceAxios.post("/color/filter", data);
  return response.data;
};

const addColorAPI = async (data) => {
  const response = await instanceAxios.post("/color/add-color", data);
  return response.data;
};

export { getColorsAPI, getFilterColorsAPI, addColorAPI };
