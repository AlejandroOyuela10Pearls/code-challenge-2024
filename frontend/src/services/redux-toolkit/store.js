import { configureStore } from "@reduxjs/toolkit";

import listenerSlice from "./slices/listenerSlice"; // Make sure you are importing the correct slice
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    ui: listenerSlice, // Ensure this is properly set up to include the UI slice that handles alerts
    user: userSlice,
  },
});

export default store;
