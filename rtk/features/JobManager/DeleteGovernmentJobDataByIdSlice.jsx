import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  DeleteGovernmentJobDataById: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const DeleteGovernmentJobDataById = createAsyncThunk(
  "jobmanager/DeleteGovernmentJobDataById",
  async (govtid) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      console.log("config", config);
      const response = await axios.delete(
        API_URL + `govt-job-delete?jobId=${govtid}`,
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

const DeleteGovernmentJobDataByIdSlice = createSlice({
  name: "DeleteGovernmentJobDataById",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(DeleteGovernmentJobDataById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteGovernmentJobDataById.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(DeleteGovernmentJobDataById.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default DeleteGovernmentJobDataByIdSlice.reducer;
