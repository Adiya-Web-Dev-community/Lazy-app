import { createSlice } from "@reduxjs/toolkit";
import { FormProductTypes } from "../types/contentType";

export interface ProductType {
  productData?: FormProductTypes;
}

const initialState: ProductType = {
  productData: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addingData: (state, { payload }) => {
      state.productData = payload;
    },
    removeData: (state) => {
      state.productData = {};
    },
  },
});

export const { addingData, removeData } = productSlice.actions;

export default productSlice.reducer;
