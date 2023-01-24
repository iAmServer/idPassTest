import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNames = createAsyncThunk("names/getNames", async () => {
  try {
    const response = await axios.get(`https://randomuser.me/api/`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const initialState = {
  isLoading: true,
  data: {},
  error: null,
};

const nameSlice = createSlice({
  name: "names",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNames.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNames.fulfilled, (state, { payload }) => {
      state.data = payload.results[0];
      state.isLoading = false;
    });
    builder.addCase(getNames.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default nameSlice.reducer;
