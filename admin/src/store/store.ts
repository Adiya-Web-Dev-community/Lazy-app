import { configureStore } from "@reduxjs/toolkit";

import companyReducer from "./companies";
import productReducer from "./Products";

const store = configureStore({
  reducer: {
    company: companyReducer,
    product: productReducer,
  },
});

export default store;
