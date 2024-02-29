import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  getCareerAdviceRequestList: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");

  return token || "";
};

export const getCareerAdviceRequestList = createAsyncThunk(
  "studentprofile/getCareerAdviceRequestList",
  async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        API_URL + "schedule-career-list",
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

const getCareerAdviceRequestListSlice = createSlice({
  name: "getCareerAdviceRequestList",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(getCareerAdviceRequestList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCareerAdviceRequestList.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getCareerAdviceRequestList.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default getCareerAdviceRequestListSlice.reducer;
