import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./card-slice";
import alertSlice from "./alert-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
