import { createSlice } from "@reduxjs/toolkit";

const initState = { msg: "", flag: false, status: "" };

const alertSlice = createSlice({
  name: "alert",
  initialState: initState,
  reducers: {
    showAlert(state, action) {
      state.msg = action.payload.msg;
      state.flag = true;
      state.status = action.payload.status;
    },
    hideAlert(state) {
      state.msg = "";
      state.flag = false;
      state.status = "";
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice;
