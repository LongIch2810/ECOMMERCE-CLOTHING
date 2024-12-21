import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGendersAPI } from "./genderAPI";

const getGenders = createAsyncThunk("gender/list", async () => {
  try {
    const data = await getGendersAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data;
    }
    console.log(error);
    return error;
  }
});

export { getGenders };
