import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  addSignUpData: [],
  error: "",
};



export const addSignUpData = createAsyncThunk(
  "signup/addSignUpData",
  async (addSignUpData) => {
    try {
      const response = await axios.post(
        API_URL + "sign_up",
        addSignUpData,
      );
      return response.data;
    } catch (error) {
      console.error("An error occurred1:", error);
      console.error("An error occurred2:", error?.response);
      console.error("An error occurred3:", error?.response?.data);
      const customId = "custom-id-yes";
      toast.error(error?.response?.data?.message, {
        toastId: customId,
      });
    }
  }
);

const addSignUpDataSlice = createSlice({
  name: "addSignUpData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(addSignUpData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSignUpData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addSignUpData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});



export default addSignUpDataSlice.reducer;
