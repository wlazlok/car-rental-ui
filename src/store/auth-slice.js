import { createSlice } from "@reduxjs/toolkit";

const initState = { token: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    saveToken(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    deleteToken(state) {
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
