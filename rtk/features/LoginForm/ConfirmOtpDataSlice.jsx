import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../src/Api/apiConfig";

const initialState = {
  loading: false,
  ConfirmOtpData: [],
  error: "",
};



export const ConfirmOtpData = createAsyncThunk(
  "ConfirmOtpData/ConfirmOtpData",
  async (fromDetail) => {
    try {
          const response = await axios.post(
            API_URL + "verify-otp",
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

const ConfirmOtpDataSlice = createSlice({
  name: "ConfirmOtpData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(ConfirmOtpData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ConfirmOtpData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(ConfirmOtpData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default ConfirmOtpDataSlice.reducer;
