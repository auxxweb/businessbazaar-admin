import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  business: null
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusiness: (state, action) => {
      state.business = action.payload;
    },
    resetBusiness: (state) => {
      state.business = null;
    }
  }
});

export const { setBusiness, resetBusiness } = businessSlice.actions;

export default businessSlice;