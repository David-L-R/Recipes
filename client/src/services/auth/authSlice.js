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

// register

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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state = { ...initialState };
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
  },
});

const { logout } = authSlice.actions;

export { register, logout };
export default authSlice.reducer;
