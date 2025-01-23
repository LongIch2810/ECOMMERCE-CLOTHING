import axios from "../../../configs/axios";

const addAddressAPI = async (data) => {
  const response = await axios.post("/address/add", data);
  return response.data;
};

const getAddressesAPI = async () => {
  const response = await axios.get("/address/list");
  return response.data;
};

const getAddressDefaultAPI = async () => {
  const response = await axios.get("/address/default");
  return response.data;
};

export { addAddressAPI, getAddressesAPI, getAddressDefaultAPI };
