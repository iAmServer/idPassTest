import {
  iQuotePayload,
  iQuoteState,
} from "./../../interfaces/quotes.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuotes = createAsyncThunk<
  iQuotePayload,
  number,
  {
    rejectValue: {
      error: string;
    };
  }
>("quotes/getQuotes", async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://quotable.io/quotes?page=${page}`);

    return response.data;
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});

const initialState: iQuoteState = {
  isLoading: false,
  quotes: [],
  error: null,
  totalPages: 0,
};

const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuotes.pending, (state) => {
      state.quotes = state.totalPages > 0 ? state.quotes : [];
      state.isLoading = true;
    });
    builder.addCase(getQuotes.fulfilled, (state, { payload }) => {
      state.quotes = payload.results;
      state.totalPages = payload.totalPages;
      state.isLoading = false;
    });
    builder.addCase(getQuotes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default quoteSlice.reducer;
