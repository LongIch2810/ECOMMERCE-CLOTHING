import instanceAxios from "../../../configs/axios";

const loginAPI = async (data) => {
  const response = await instanceAxios.post("/auth/login", data);
  return response?.data;
};

const registerAPI = async (data) => {
  const response = await instanceAxios.post("/auth/register", data);
  return response?.data;
};

const logoutAPI = async () => {
  const response = await instanceAxios.post("/auth/logout");
  return response?.data;
};

const sendOtpAPI = async (data) => {
  const response = await instanceAxios.post("/auth/forgot-password", data);
  return response?.data;
};

const resetPasswordAPI = async (data) => {
  const response = await instanceAxios.post("/auth/reset-password", data);
  return response?.data;
};

export { loginAPI, registerAPI, logoutAPI, sendOtpAPI, resetPasswordAPI };
