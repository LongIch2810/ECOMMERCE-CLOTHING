import axios from "../../../configs/axios";

const getGendersAPI = async () => {
  const response = await axios.get("/gender");
  return response.data;
};

export { getGendersAPI };
