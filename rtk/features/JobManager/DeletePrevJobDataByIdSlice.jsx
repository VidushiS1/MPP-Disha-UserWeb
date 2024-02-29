import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  DeletePrevJobDataById: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const DeletePrevJobDataById = createAsyncThunk(
  "jobmanager/DeletePrevJobDataById",
  async (privid) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      console.log("config", config);
      const response = await axios.delete(
        API_URL + `pvt-job-delete?jobId=${privid}`,
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

const DeletePrevJobDataByIdSlice = createSlice({
  name: "DeletePrevJobDataById",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(DeletePrevJobDataById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeletePrevJobDataById.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(DeletePrevJobDataById.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default DeletePrevJobDataByIdSlice.reducer;
