import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  login: false,
};

const userSlice = createSlice({
  name: "authority",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { _id, name, email, image, token } = action.payload;
      state.user = { _id, name, email, image, token };
      state.isAuthenticated = true;
      state.login = true;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetLogin: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.login = false;
    },
  },
});

export const { setLogin, setLoading, resetLogin } = userSlice.actions;

export default userSlice;
