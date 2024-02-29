import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  getGovJobsListData: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const getGovJobsListData = createAsyncThunk(
  "jobmanager/getGovJobsListData",
  async (ids) => {
    try {
      const sectorObj = {
        sector_id:   ids
      }
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };

      let response;

     if(ids?.length) {
       response = await axios.post(
        API_URL + "gov-jobs-list",sectorObj,
        config
      );
     }else{
       response = await axios.post(
        API_URL + "gov-jobs-list",sectorObj,
        config
      );
     }
     
      return response?.data;
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

const getGovJobsListDataSlice = createSlice({
  name: "getGovJobsListData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(getGovJobsListData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGovJobsListData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getGovJobsListData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default getGovJobsListDataSlice.reducer;
