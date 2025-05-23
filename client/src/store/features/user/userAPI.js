import instanceAxios from "../../../configs/axios";

const getUserInfoAPI = async () => {
  const response = await instanceAxios.get("/user/info");
  console.log(response);
  return response?.data;
};

const saveVoucherAPI = async ({ voucher_id }) => {
  const response = await instanceAxios.post("/user/save-voucher", {
    voucher_id,
  });
  return response?.data;
};

const getVoucherAPI = async ({ voucher_id }) => {
  const response = await instanceAxios.get(`/user/voucher-info/${voucher_id}`);
  return response?.data;
};

const updateInfoAPI = async (data) => {
  const response = await instanceAxios.put("/user/update-info", data);
  return response?.data;
};

const updateAvatarAPI = async (formData) => {
  const response = await instanceAxios.put("/user/update-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
};

const getUsersAPI = async (data) => {
  const response = await instanceAxios.post("/user/get-all", data);
  return response?.data;
};

const addUserAPI = async (data) => {
  const response = await instanceAxios.post("/user/add-user", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data;
};

const editUserAPI = async ({
  user_id,
  name,
  password,
  phone,
  fullname,
  email,
}) => {
  const response = await instanceAxios.put(`user/edit/${user_id}`, {
    name,
    password,
    phone,
    email,
    fullname,
  });
  return response?.data;
};

const deleteUserAPI = async (user_id) => {
  const response = await instanceAxios.delete(`user/delete/${user_id}`);
  return response?.data;
};

const getUserByIdAPI = async (user_id) => {
  const response = await instanceAxios.get(`user/get-user/${user_id}`);
  return response?.data;
};

export {
  getUserInfoAPI,
  saveVoucherAPI,
  getVoucherAPI,
  updateInfoAPI,
  updateAvatarAPI,
  getUsersAPI,
  addUserAPI,
  editUserAPI,
  deleteUserAPI,
  getUserByIdAPI,
};
