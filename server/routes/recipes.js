import express from "express";
const router = express.Router();
import {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipes.js";

router.route("/").get(getAllRecipes).post(addNewRecipe);

router
  .route("/:id")
  .get(getRecipeById)
  .patch(updateRecipe)
  .delete(deleteRecipe);

router.route("/category/:name").get((req, res) => {});

export default router;
