import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const settingsDetails = createAsyncThunk(
    'authority/settingsDetails',
    async (_, thunkAPI) => {
      try {

        console.log('authority/settingsDetails')
        // const res = await fetch("http://127.0.0.1:8000/settings/", {  
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //   }
        // });
  
        // const data = await res.json();
        
        // if (res.ok) {
        //   return data;
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Failed to retrieve Settings details',
        //   });
        //   return thunkAPI.rejectWithValue(data);
        // }
      } catch (error) {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Something went wrong. Please inform the developer.',
        // });
        // return thunkAPI.rejectWithValue();
      }
    }
  );
  






  
// Initial state for the slice
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    login: false,
  };
  
  // Redux slice for authority management
  const userSlice = createSlice({
    name: 'authority',
    initialState,
    reducers: {
      resetLogin: (state) => {
        state.login = false;
      }
    },
    extraReducers: (builder) => {
      builder
       
        .addCase(settingsDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(settingsDetails.fulfilled, (state, action) => {
          state.loading = false;
          // state.settingsDetails = action.payload;
        })
        .addCase(settingsDetails.rejected, (state) => {
          state.loading = false;
          // state.settingsDetails = null;
        })
  
    }
  });
  
  // Export actions from the slice
  export const { resetLogin } = userSlice.actions;
  
  // Export the reducer function
  export default userSlice.reducer;
  