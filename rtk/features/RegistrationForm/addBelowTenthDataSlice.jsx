import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  addBelowTenthData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token || "";
  };


export const addBelowTenthData = createAsyncThunk(
  "signup/addBelowTenthData",
  async (addBelowTenthData) => {
    const config2 = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "multipart/form-data",
        },
      };
    try {
      const response = await axios.post(
        API_URL + "below-10th-qualification",
        addBelowTenthData,config2
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

const addBelowTenthDataSlice = createSlice({
  name: "addBelowTenthData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(addBelowTenthData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBelowTenthData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addBelowTenthData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});



export default addBelowTenthDataSlice.reducer;
