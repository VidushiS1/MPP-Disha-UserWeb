import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  addTwelfthData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token || "";
  };


export const addTwelfthData = createAsyncThunk(
  "signup/addTwelfthData",
  async (addTwelfthData) => {
    const config2 = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "multipart/form-data",
        },
      };
    try {
      const response = await axios.post(
        API_URL + "class-12th-qualification",
        addTwelfthData,config2
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

const addTwelfthDataSlice = createSlice({
  name: "addTwelfthData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(addTwelfthData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTwelfthData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addTwelfthData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});



export default addTwelfthDataSlice.reducer;
