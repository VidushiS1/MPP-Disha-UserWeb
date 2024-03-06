import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../src/Api/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  getNationalScholarshipListData: [],
  error: "",
};
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const getNationalScholarshipListData = createAsyncThunk(
  "studentprofile/getNationalScholarshipListData",
  async ({selectedValue,selectedCat}) => {
    console.log("selectedValue",selectedValue);
    console.log("selectedCat",selectedCat);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          "Content-Type": "application/json",
        },
      };
      let url = API_URL + "scholarship-list";
      if (selectedCat) {
        url += `?catId=${selectedCat}`;
      }else if(selectedValue){
        url += `?mp_police=${selectedValue}`
      }
      const response = await axios.get(url, config);
      
      
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

const getNationalScholarshipListDataSlice = createSlice({
  name: "getNationalScholarshipListData",
  initialState,
  extraReducers: (builder) => {
    // ----------------------------------------------------
    builder.addCase(getNationalScholarshipListData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNationalScholarshipListData.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getNationalScholarshipListData.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default getNationalScholarshipListDataSlice.reducer;
