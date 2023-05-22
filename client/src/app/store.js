import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/auth/authSlice";
import recipeReducer from "../services/recipes/recipeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
  },
});
