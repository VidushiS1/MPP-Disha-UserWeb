import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  UpdateEditProfile: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

// Generates pending, fulfilled, and rejected action types
export const UpdateEditProfile = createAsyncThunk(
  "UpdateEditProfile/UpdateEditProfile",
  async (newData) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        API_URL + "update-profile",
        newData,
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

const UpdateEditProfileSlice = createSlice({
  name: "UpdateEditProfile",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(UpdateEditProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateEditProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(UpdateEditProfile.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default UpdateEditProfileSlice.reducer;
