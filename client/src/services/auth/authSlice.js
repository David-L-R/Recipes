import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ password, confirmPassword, token }, { rejectWithValue }) => {
    try {
      return await authService.resetPassword({
        password,
        confirmPassword,
        token,
      });
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      return await authService.forgotPassword(email);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// register action
const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.register(user);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// login

const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      console.log("success", payload);
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", JSON.stringify(payload.token));
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.success = true;
      state.error = false;
      state.message = "user registered successfully";
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", JSON.stringify(payload.token));
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.success = true;
      state.error = false;
      state.message = "user logged in successfully";
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
    [forgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.message = payload.message;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.message = payload.message;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
  },
});

const { logout } = authSlice.actions;

export { login, register, logout, forgotPassword, resetPassword };
export default authSlice.reducer;
