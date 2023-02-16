import express from "express";
const router = express.Router();
import {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipes.js";
import { protect } from "../middleware/auth.js";

router.route("/").get(getAllRecipes).post(protect, addNewRecipe);

router
  .route("/:id")
  .get(getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

router.route("/category/:name").get((req, res) => {});

export default router;
