import { createSlice } from "@reduxjs/toolkit";
import { CompanySliceType } from "../types/contentType";

const initialState: CompanySliceType = {
  companyData: {},
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addingData: (state, { payload }) => {
      state.companyData = payload;
    },
    removeData: (state) => {
      state.companyData = {};
    },
  },
});

export const { addingData, removeData } = companySlice.actions;

export default companySlice.reducer;
