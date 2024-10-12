
import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Features/Authority.js'


export const store = configureStore({
    reducer:{
        authority:userSlice
    }
})