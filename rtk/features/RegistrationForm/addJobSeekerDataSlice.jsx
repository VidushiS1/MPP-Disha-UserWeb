import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  addJobSeekerData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token || "";
  };


export const addJobSeekerData = createAsyncThunk(
  "signup/addJobSeekerData",
  async (addJobSeekerData) => {
    const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
    try {
      const response = await axios.post(
        API_URL + "jobs-seeker",
        addJobSeekerData,config
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

const addJobSeekerDataSlice = createSlice({
  name: "addJobSeekerData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(addJobSeekerData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addJobSeekerData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addJobSeekerData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});



export default addJobSeekerDataSlice.reducer;
