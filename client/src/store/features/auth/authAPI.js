import axios from "../../../configs/axios";

const loginAPI = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response?.data;
};

const registerAPI = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response?.data;
};

const logoutAPI = async () => {
  const response = await axios.post("/auth/logout");
  return response?.data;
};

export { loginAPI, registerAPI, logoutAPI };
