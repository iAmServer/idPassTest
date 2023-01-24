import {
  iNamesPayload,
  iName,
  iNameState,
} from "./../../interfaces/names.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNames = createAsyncThunk<
  iNamesPayload,
  void,
  {
    rejectValue: {
      error: string;
    };
  }
>("names/getNames", async (_: void, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://randomuser.me/api/`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    rejectWithValue({ error: error.message });
  }
});

const initialState: iNameState = {
  isLoading: true,
  data: {} as iName,
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
