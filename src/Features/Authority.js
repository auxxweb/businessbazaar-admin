import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage } from "../utils/app.utils";

// login-admin
export const adminLogin = createAsyncThunk(
  "adminAuth/adminLogin",
  async (adminData, thunkAPI) => {
    try {
      // return await adminService.login(adminData)
    } catch (error) {
      return thunkAPI.rejectWithValue(errorMessage(error));
    }
  }
);

// Initial state for the slice
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  login: false
};

// Redux slice for authority management
const userSlice = createSlice({
  name: "authority",
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.login = false;
    }
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(settingsDetails.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(settingsDetails.fulfilled, (state, action) => {
    //     state.loading = false;
    //     // state.settingsDetails = action.payload;
    //   })
    //   .addCase(settingsDetails.rejected, (state) => {
    //     state.loading = false;
    //     // state.settingsDetails = null;
    //   })
  }
});

// Export actions from the slice
export const { resetLogin } = userSlice.actions;

// Export the reducer function
export default userSlice.reducer;
