import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ?? null,
  token: JSON.parse(localStorage.getItem("token")) ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const REGISTER = "auth/register";

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  REGISTER,
  async (user, { rejectWithValue }) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return rejectWithValue(message);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Registration Successful";
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || action.error.message;
        state.user = null;
        state.token = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Login Successful";
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || action.error.message;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;
