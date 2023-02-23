import express from "express";
import { validateToken } from "../middleware/authMiddleware.js";

import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controller/recipesController.js";
const router = express.Router();

// api/recipes/
router.route("/").get(getAllRecipes).post(validateToken, createRecipe);

// api/recipes/:id
router
  .route("/:id")
  .get(getRecipeById)
  .put(validateToken, updateRecipe)
  .delete(validateToken, deleteRecipe);

export default router;
