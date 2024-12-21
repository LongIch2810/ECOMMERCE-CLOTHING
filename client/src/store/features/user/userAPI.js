import axios from "../../../configs/axios";

const getUserInfoAPI = async () => {
  const response = await axios.get("/user/info");
  console.log(response);
  return response?.data;
};

export { getUserInfoAPI };
