import express from "express";
const router = express.Router();
import {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  replaceRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipes.js";

router.route("/").get(getAllRecipes);

router
  .route("/:id")
  .get(getRecipeById)
  .post(addNewRecipe)
  .put(replaceRecipe)
  .patch(updateRecipe)
  .delete(deleteRecipe);

router.route("/category/:name").get((req, res) => {});

export default router;
