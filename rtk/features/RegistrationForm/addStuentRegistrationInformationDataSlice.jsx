import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  addStuentRegistrationInformationData: [],
  error: "",
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const addStuentRegistrationInformationData = createAsyncThunk(
  "signup/addStuentRegistrationInformationData",
  async (addStuentRegistrationInformationData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    };
    try {
      const response = await axios.post(
        API_URL + "student-registration",
        addStuentRegistrationInformationData,
        config
      );
      console.log("response",response);
      if(response?.data){
        localStorage.setItem("student_id", response?.data?.student_id);
      }
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

const addStuentRegistrationInformationDataSlice = createSlice({
  name: "addStuentRegistrationInformationData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(addStuentRegistrationInformationData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addStuentRegistrationInformationData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(addStuentRegistrationInformationData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});



export default addStuentRegistrationInformationDataSlice.reducer;
