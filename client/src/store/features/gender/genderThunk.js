import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGendersAPI } from "./genderAPI";

const getGenders = createAsyncThunk("gender/list", async () => {
  try {
    const data = await getGendersAPI();
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
    console.log(error);
    return thunkAPI.rejectWithValue({ message: "Unexpected error occurred" });
  }
});

export { getGenders };
