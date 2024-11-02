import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Features/Authority.js';
import BusinessSlice from "./Features/Business.js";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from "redux";

const persistConfig = {
  key: 'root',       
  storage,           
  whitelist: ['authority'] 
};

const rootReducer = combineReducers({
  authority: userSlice.reducer,
  businessSlice: BusinessSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
