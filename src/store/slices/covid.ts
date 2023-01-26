import { iCovid, iCovidState } from "./../../interfaces/covid.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodayStat = createAsyncThunk<
  iCovid[],
  void,
  {
    rejectValue: {
      error: string;
    };
  }
>("covid/getTodayStat", async (_: void, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://api.covidtracking.com/v1/us/daily.json`
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    rejectWithValue({ error: error.message });
  }
});

const initialState: iCovidState = {
  isLoading: false,
  stats: [],
  error: null,
};

const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodayStat.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodayStat.fulfilled, (state, { payload }) => {
      state.stats = payload;
      state.isLoading = false;
    });
    builder.addCase(getTodayStat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default covidSlice.reducer;
