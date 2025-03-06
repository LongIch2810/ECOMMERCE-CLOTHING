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

const editColorAPI = async ({ colorId, name, hexCode }) => {
  const response = await instanceAxios.put(`/color/edit/${colorId}`, {
    name,
    hexCode,
  });
  return response.data;
};

const deleteColorAPI = async (colorId) => {
  const response = await instanceAxios.delete(`/color/delete/${colorId}`);
  return response.data;
};

const getColorByIdAPI = async (colorId) => {
  const response = await instanceAxios.get(`/color/get-color/${colorId}`);
  return response.data;
};

export {
  getColorsAPI,
  getFilterColorsAPI,
  addColorAPI,
  editColorAPI,
  deleteColorAPI,
  getColorByIdAPI,
};
