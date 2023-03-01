import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ?? null,
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
      const loginUser = await authService.login(user);
      console.log("login user", loginUser);
      return loginUser;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      console.log("Typeof Message", typeof message);

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
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Registration Successful";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || action.error.message;
        state.user = null;
      });
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;
