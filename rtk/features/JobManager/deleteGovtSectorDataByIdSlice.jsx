import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  deleteGovtSectorDataById: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const deleteGovtSectorDataById = createAsyncThunk(
  "jobmanager/deleteGovtSectorDataById",
  async (govtsectorid) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      console.log("config", config);
      const response = await axios.delete(
        API_URL + `govt-sector-delete?sector_id=${govtsectorid}`,
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

const deleteGovtSectorDataByIdSlice = createSlice({
  name: "deleteGovtSectorDataById",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(deleteGovtSectorDataById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteGovtSectorDataById.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(deleteGovtSectorDataById.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default deleteGovtSectorDataByIdSlice.reducer;
