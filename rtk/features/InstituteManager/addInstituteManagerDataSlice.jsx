import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  addInstituteManagerData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const addInstituteManagerData = createAsyncThunk(
  "jobmanager/addInstituteManagerData",
  async (addInstituteManagerData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        API_URL + "add-institute",
        addInstituteManagerData,
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

const addInstituteManagerDataSlice = createSlice({
  name: "addInstituteManagerData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(addInstituteManagerData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addInstituteManagerData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addInstituteManagerData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default addInstituteManagerDataSlice.reducer;
