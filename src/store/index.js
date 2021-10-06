import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./card-slice";
import alertSlice from "./alert-slice";

const store = configureStore({
  reducer: {
    card: cardSlice.reducer,
    alert: alertSlice.reducer,
  },
});

export default store;
