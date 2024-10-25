import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    id: "950d83a6-6108-44d5-bd95-29de233d1e49",
    name: "Support User 1",
    email: "support.user+1@gmail.com",
    role: "Support User",
    active: true,
    devices: null,
  },
};

const listenerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = initialState.data;
    },
  },
});

export const { setUser, clearUser } = listenerSlice.actions;
export const selectUser = (state) => state.user.data;
export default listenerSlice.reducer;
