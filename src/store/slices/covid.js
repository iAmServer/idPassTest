import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  stats: [],
  error: null,
};

const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {},
});

export default covidSlice.reducer;
