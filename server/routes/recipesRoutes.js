import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controller/recipesController.js";
const router = express.Router();

router.route("/").get(getAllRecipes).post(createRecipe);

router.route("/:id").get(getRecipeById).put(updateRecipe).delete(deleteRecipe);

export default router;

// router.get("/", callback);
// router.post("/", callback2);
// router.put("/", callback3);
// router.delete("/", callback4);

// router
//   .route("/")
//   .delete(callback4);
//   .get(callback1)
//   .post(callback2)
//   .put(callback3)
