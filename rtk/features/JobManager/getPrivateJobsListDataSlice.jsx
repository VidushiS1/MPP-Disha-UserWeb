import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  getPrivateJobsListData: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const getPrivateJobsListData = createAsyncThunk(
  "studentprofile/getPrivateJobsListData",
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

      if(ids?.length){
        response =  await axios.post(
          API_URL + "pvt-jobs-list",sectorObj,
          config
        );
      }else{
        response = await axios.post(
          API_URL + "pvt-jobs-list",sectorObj,
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

const getPrivateJobsListDataSlice = createSlice({
  name: "getPrivateJobsListData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(getPrivateJobsListData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrivateJobsListData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getPrivateJobsListData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default getPrivateJobsListDataSlice.reducer;
