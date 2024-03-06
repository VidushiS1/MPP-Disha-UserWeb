import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  updateCareerAdviceData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const updateCareerAdviceData = createAsyncThunk(
  "jobmanager/updateCareerAdviceData",
  async (updateCareerAdviceData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        API_URL + "schedule-career-edit",
        updateCareerAdviceData,
        config
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

const updateCareerAdviceDataSlice = createSlice({
  name: "updateCareerAdviceData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(updateCareerAdviceData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCareerAdviceData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(updateCareerAdviceData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default updateCareerAdviceDataSlice.reducer;
