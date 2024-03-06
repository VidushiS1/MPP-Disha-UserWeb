import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  getFilterResultData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const getFilterResultData = createAsyncThunk(
  "jobmanager/getFilterResultData",
  async (getFilterResultData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        API_URL + "filtered-result",
        getFilterResultData,
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

const getFilterResultDataSlice = createSlice({
  name: "getFilterResultData",
  initialState,
  reducers: {
    resetFilterResultState: (state) => initialState,
  },
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(getFilterResultData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFilterResultData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getFilterResultData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export const { resetFilterResultState } = getFilterResultDataSlice.actions;


export default getFilterResultDataSlice.reducer;
