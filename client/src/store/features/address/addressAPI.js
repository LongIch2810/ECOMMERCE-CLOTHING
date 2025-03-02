import instanceAxios from "../../../configs/axios";

const addAddressAPI = async (data) => {
  const response = await instanceAxios.post("/address/add", data);
  return response.data;
};

const getAddressesByUserIdAPI = async () => {
  const response = await instanceAxios.get("/address/list");
  return response.data;
};

const getAddressDefaultAPI = async () => {
  const response = await instanceAxios.get("/address/default");
  return response.data;
};

const getAddressesAPI = async (data) => {
  const response = await instanceAxios.post("/address/get-all", data);
  return response.data;
};

const setAddressDefaultAPI = async (address_id) => {
  const response = await instanceAxios.put(
    `/address/set-default/${address_id}`
  );
  return response.data;
};

export {
  addAddressAPI,
  getAddressesByUserIdAPI,
  getAddressDefaultAPI,
  getAddressesAPI,
  setAddressDefaultAPI,
};
