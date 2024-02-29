import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../src/Api/apiConfig";

const initialState = {
  loading: false,
  ConfirmPasswordData: [],
  error: "",
};



export const ConfirmPasswordData = createAsyncThunk(
  "ConfirmPasswordData/ConfirmPasswordData",
  async (fromDetail) => {
    try {
          const response = await axios.post(
            API_URL + "reset-password",
            fromDetail,
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

const ConfirmPasswordDataSlice = createSlice({
  name: "ConfirmPasswordData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(ConfirmPasswordData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ConfirmPasswordData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(ConfirmPasswordData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default ConfirmPasswordDataSlice.reducer;
