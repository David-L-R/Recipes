import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
});
const getRecipeById = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  res.status(200).json(recipe);
});
const addNewRecipe = async (req, res, next) => {
  if (!req.body) {
    throw new Error("Request body is missing");
  }

  console.log(req.body);

  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  await recipe.remove();

  res.status(200).json({ id });
};

export {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  updateRecipe,
  deleteRecipe,
};
