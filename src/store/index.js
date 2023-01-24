import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slices/shop";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});
