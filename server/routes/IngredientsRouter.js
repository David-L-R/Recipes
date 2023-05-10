import express from "express";
import { validateToken } from "../middleware/authMiddleware.js";

import {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  createIngredients,
} from "../controller/ingredientsController.js";
import { validateAdmin } from "../middleware/authAdminMiddleware.js";
const router = express.Router();

router.route("/").get(getAllIngredients).post(validateAdmin, createIngredient);
router
  .route("/:id")
  .get(getIngredientById)
  .put(validateAdmin, updateIngredient)
  .delete(validateAdmin, deleteIngredient);

router.route("/enter_all_ingredients").post(validateAdmin, createIngredients);

export default router;
