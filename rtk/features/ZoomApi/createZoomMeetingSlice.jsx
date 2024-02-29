import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  createZoomMeeting: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const createZoomMeeting = createAsyncThunk(
  "zoom/createZoomMeeting",
  async (broadcastScheduledForm) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        API_URL + "create-meeting",
        broadcastScheduledForm,
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

const createZoomMeetingSlice = createSlice({
  name: "createZoomMeeting",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(createZoomMeeting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createZoomMeeting.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(createZoomMeeting.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default createZoomMeetingSlice.reducer;
