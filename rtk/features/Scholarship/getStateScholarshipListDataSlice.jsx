import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  getStateScholarshipListData: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const getStateScholarshipListData = createAsyncThunk(
  "studentprofile/getStateScholarshipListData",
  async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      let url = API_URL + "scholarship-list-state";
      if (id) {
        url += `?catId=${id}`;
      }
      const response = await axios.get(url, config);
      
      return response.data;
    } catch (error) {
      console.error("An error occurred1:", error);
      console.error("An error occurred2:", error?.response);
      console.error("An error occurred3:", error?.response?.data);

      const customId = "custom-id-yes";
      toast.error(error?.response?.data?.message, {
        toastId: customId,
      });
      // Rethrow the error so it gets handled by the rejection handler
      throw error;
    }
  }
);


const getStateScholarshipListDataSlice = createSlice({
  name: "getStateScholarshipListData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(getStateScholarshipListData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStateScholarshipListData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getStateScholarshipListData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default getStateScholarshipListDataSlice.reducer;
