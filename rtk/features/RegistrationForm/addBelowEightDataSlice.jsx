import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  addBelowEightData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token || "";
  };


export const addBelowEightData = createAsyncThunk(
  "signup/addBelowEightData",
  async (addBelowEightData) => {
    const config2 = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "multipart/form-data",
        },
      };
    try {
      const response = await axios.post(
        API_URL + "below-8th-qualification",
        addBelowEightData,config2
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

const addBelowEightDataSlice = createSlice({
  name: "addBelowEightData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(addBelowEightData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBelowEightData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addBelowEightData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});



export default addBelowEightDataSlice.reducer;
