import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";
import mongoose from "mongoose";

const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
});
const getRecipeById = asyncHandler(async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(400);
      throw new Error("No recipe was found");
    }

    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
});

const addNewRecipe = asyncHandler(async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    return next(new Error("Request body is missing"));
  }

  if (!req.user) {
    res.status(400);
    return next(new Error("User cannot be found"));
  }

  try {
    const newRecipe = await Recipe.create({
      userId: req.user._id,
      ...req.body,
    });
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
});

const updateRecipe = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const recipeToUpdate = await Recipe.findById(id);

  try {
    if (req.user._id.toString() !== recipeToUpdate.userId.toString()) {
      res.status(401);
      throw new Error("This user is not authorize to change this resource");
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateRecipe) {
      res.status(400);
      throw new Error("No recipe was found");
    }

    res.status(200).json(updatedRecipe);
  } catch (err) {
    next(err);
  }
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  await recipe.remove();

  res.status(200).json({ id });
});

export {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  updateRecipe,
  deleteRecipe,
};
