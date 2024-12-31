import { createAsyncThunk } from "@reduxjs/toolkit";
import { addReviewAPI, getReviewsAPI } from "./reviewAPI";
import { toast } from "react-toastify";

const addReview = createAsyncThunk(
  "review/add",
  async ({ star, content, product_id }) => {
    try {
      const dataAddReview = await addReviewAPI({ star, content, product_id });
      toast.success(dataAddReview.message);
      const dataReviews = await getReviewsAPI({ product_id });
      return { dataAddReview, dataReviews };
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return error.response.data;
      }
      console.log(error);
      return error;
    }
  }
);

const getReviews = createAsyncThunk("review/list", async ({ product_id }) => {
  try {
    const data = await getReviewsAPI({ product_id });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data;
    }
    console.log(error);
    return error;
  }
});

export { addReview, getReviews };
