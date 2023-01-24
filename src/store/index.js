import { configureStore } from "@reduxjs/toolkit";
import covidReducer from "./slices/covid";
import nameReducer from "./slices/names";
import quoteReducer from "./slices/quotes";

export const store = configureStore({
  reducer: {
    covid: covidReducer,
    names: nameReducer,
    quotes: quoteReducer,
  },
});
