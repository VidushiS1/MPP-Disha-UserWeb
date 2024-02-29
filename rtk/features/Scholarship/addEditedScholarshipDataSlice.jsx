import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  addEditedScholarshipData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const addEditedScholarshipData = createAsyncThunk(
  "jobmanager/addEditedScholarshipData",
  async (AddScholarshipForm) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        API_URL + "scholarship-edit",
        AddScholarshipForm,
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

const addEditedScholarshipDataSlice = createSlice({
  name: "addEditedScholarshipData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(addEditedScholarshipData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEditedScholarshipData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addEditedScholarshipData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default addEditedScholarshipDataSlice.reducer;
