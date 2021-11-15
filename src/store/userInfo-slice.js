import { createSlice } from "@reduxjs/toolkit";

const initState = { username: "", name: "", avatarUrl: "" };

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initState,
  reducers: {
    saveInfo(state, action) {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.avatarUrl = action.payload.avatarUrl;
    },
    deleteInfo(state) {
      state.username = "";
      state.name = "";
      state.avatarUrl = "";
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice;
