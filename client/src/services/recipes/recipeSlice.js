import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recipeService from "../recipes/recipeService";

const initialState = {
  recipes: [],
  loading: false,
  error: null,
  recipe: null,
  success: false,
  message: null,
};

const getRecipes = createAsyncThunk(
  "recipes/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      return await recipeService.getRecipes({ token: getState().auth.token });
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

const getRecipeByID = createAsyncThunk(
  "recipes/getByID",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      return await recipeService.getByID({
        id,
        token: getState().auth.token,
      });
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

const createRecipe = createAsyncThunk(
  "recipes/create",
  async ({ recipe }, { getState, rejectWithValue }) => {
    try {
      return await recipeService.createRecipe({
        recipe,
        token: getState().auth.token,
      });
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

const updateRecipe = createAsyncThunk(
  "recipes/update",
  async ({ id, updatedRecipeFields }, { getState, rejectWithValue }) => {
    try {
      return await recipeService.updateRecipe({
        id,
        updatedRecipeFields,
        token: getState().auth.token,
      });
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

const deleteRecipe = createAsyncThunk(
  "recipes/delete",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      return await recipeService.deleteRecipe({
        id,
        token: getState().auth.token,
      });
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: {
    [getRecipes.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getRecipes.fulfilled]: (state, { payload }) => {
      state.recipes = payload;
      state.loading = false;
      state.error = false;
    },
    [getRecipes.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
    [getRecipeByID.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getRecipeByID.fulfilled]: (state, { payload }) => {
      state.recipe = payload;
      state.loading = false;
      state.error = false;
    },
    [getRecipeByID.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
    [createRecipe.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [createRecipe.fulfilled]: (state, { payload }) => {
      state.recipes.push(payload);
      state.loading = false;
      state.error = false;
      state.success = true;
      state.message = "Recipe created successfully";
    },
    [createRecipe.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
    [updateRecipe.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updateRecipe.fulfilled]: (state, { payload }) => {
      state.recipe = payload;
      state.loading = false;
      state.error = false;
      state.success = true;
      state.message = "Recipe updated successfully";
    },
    [updateRecipe.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
    [deleteRecipe.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [deleteRecipe.fulfilled]: (state, { payload }) => {
      state.recipes = state.recipes.filter((recipe) => recipe._id !== payload);
      state.loading = false;
      state.error = false;
      state.success = true;
      state.message = "Recipe deleted successfully";
    },
    [deleteRecipe.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.message;
    },
  },
});

// const { logout } = authSlice.actions;

export { getRecipes, getRecipeByID, createRecipe, updateRecipe, deleteRecipe };
export default recipeSlice.reducer;
