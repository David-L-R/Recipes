import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controller/recipesController.js";
const router = express.Router();

// api/recipes/
router.route("/").get(getAllRecipes).post(createRecipe);

// api/recipes/:id
router.route("/:id").get(getRecipeById).put(updateRecipe).delete(deleteRecipe);

export default router;
