import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  EditPrevJobData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const EditPrevJobData = createAsyncThunk(
  "jobmanager/EditPrevJobData",
  async (newAddedSector) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        API_URL + "pvt-job-edit",
        newAddedSector,
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

const EditPrevJobDataSlice = createSlice({
  name: "EditPrevJobData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(EditPrevJobData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(EditPrevJobData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(EditPrevJobData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default EditPrevJobDataSlice.reducer;
