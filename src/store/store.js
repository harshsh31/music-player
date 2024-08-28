import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../slices/rootReducer";
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
});

export default store;
