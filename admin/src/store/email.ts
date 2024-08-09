import { createSlice } from "@reduxjs/toolkit";

export interface EmailSliceType {
  userEmail: string;
}

const initialState: EmailSliceType = {
  userEmail: "",
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    addingEmailData: (state, { payload }) => {
      console.log(payload, "from email slice");
      state.userEmail = payload;
    },
    removeEmailData: (state) => {
      state.userEmail = "";
    },
  },
});

export const { addingEmailData, removeEmailData } = emailSlice.actions;

export default emailSlice.reducer;
