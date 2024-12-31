import axios from "../../../configs/axios";

const addReviewAPI = async ({ star, content, product_id }) => {
  const response = await axios.post("/review/add", {
    star,
    content,
    product_id,
  });
  return response.data;
};

const getReviewsAPI = async ({ product_id }) => {
  const response = await axios.get(`/review/${product_id}`);
  return response.data;
};

export { addReviewAPI, getReviewsAPI };
