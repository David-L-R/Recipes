import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const login = createAsyncThunk("auth/login", async (user, thunkAPi) => {
  try {
    return await authService.login(user);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPi.rejectWithValue(message);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPi) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      console.log("Message", message);
      return thunkAPi.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          console.log("fullfilled", action.payload);
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
          console.log(action.payload);
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;
