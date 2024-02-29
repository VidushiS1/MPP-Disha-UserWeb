import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  ViewCareerAdviceSettingsDataList: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const ViewCareerAdviceSettingsDataList = createAsyncThunk(
  "jobmanager/ViewCareerAdviceSettingsDataList",
  async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        API_URL + "career-advise-agenda-list",
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

const ViewCareerAdviceSettingsDataListSlice = createSlice({
  name: "ViewCareerAdviceSettingsDataList",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(ViewCareerAdviceSettingsDataList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ViewCareerAdviceSettingsDataList.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(ViewCareerAdviceSettingsDataList.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default ViewCareerAdviceSettingsDataListSlice.reducer;
