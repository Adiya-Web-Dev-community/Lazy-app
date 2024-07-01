import { createSlice } from "@reduxjs/toolkit";

export interface CompanyDataTypes {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  webLink?: string;
  status?: string;
  products?: number;
  joinDate?: string;
}

export interface CompanyType {
  companyData?: CompanyDataTypes;
}

const initialState: CompanyType = {
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
