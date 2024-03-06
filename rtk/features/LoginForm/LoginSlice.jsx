import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../src/Api/apiConfig";

const initialState = {
  loading: false,
  loginFormData: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const loginFormData = createAsyncThunk(
  "login/loginform",
  async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(API_URL + "login", formData, config);
      console.log("response in login", response);
      const customId = "custom-id-yes";
      if (response?.data?.message) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("student_id", response?.data?.student_id);
      } else if (response?.data?.status === false) {
        toast.error(response?.data?.message, {
          toastId: customId,
        });
      }
      console.log("response in login", response);
      return response;
    } catch (error) {
      const customId = "custom-id-yes";
      toast.error(error?.response?.data?.message, {
        toastId: customId,
      });
    }
  }
);
const loginFromSlice = createSlice({
  name: "loginFormData",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.loading = false;
      state.users = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginFormData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginFormData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(loginFormData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export const { resetForm } = loginFromSlice.actions;
export default loginFromSlice.reducer;
