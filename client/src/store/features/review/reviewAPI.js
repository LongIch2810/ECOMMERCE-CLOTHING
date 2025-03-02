import instanceAxios from "../../../configs/axios";

const addReviewAPI = async ({ star, content, product_id }) => {
  const response = await instanceAxios.post("/review/add", {
    star,
    content,
    product_id,
  });
  return response.data;
};

const getReviewsAPI = async ({ product_id }) => {
  const response = await instanceAxios.get(`/review/${product_id}`);
  return response.data;
};

export { addReviewAPI, getReviewsAPI };
