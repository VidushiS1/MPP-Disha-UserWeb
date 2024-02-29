import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  deleteScholershipDataById: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const deleteScholershipDataById = createAsyncThunk(
  "jobmanager/deleteScholershipDataById",
  async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
     
      const response = await axios.delete(
        API_URL + `scholarship-delete?scholarId=${id}`,
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

const deleteScholershipDataByIdSlice = createSlice({
  name: "deleteScholershipDataById",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(deleteScholershipDataById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteScholershipDataById.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(deleteScholershipDataById.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default deleteScholershipDataByIdSlice.reducer;
