// Assuming your store configuration file is named store.ts

import { combineReducers } from "@reduxjs/toolkit";
import companyReducer from "./companies"; // Adjust import path as per your actual file structure
import productReducer from "./Products"; // Adjust import path as per your actual file structure
import emailReducer from "./email"; // Adjust import path as per your actual file structure

const rootReducer = combineReducers({
  company: companyReducer,
  product: productReducer,
  email: emailReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
