import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  deleteInstituteManagerData: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const deleteInstituteManagerData = createAsyncThunk(
  "jobmanager/deleteInstituteManagerData",
  async (instituteId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      console.log("config", config);
      const response = await axios.delete(
        API_URL + `institute-delete?institute_id=${instituteId}`,
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

const deleteInstituteManagerDataSlice = createSlice({
  name: "deleteInstituteManagerData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(deleteInstituteManagerData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteInstituteManagerData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(deleteInstituteManagerData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default deleteInstituteManagerDataSlice.reducer;
