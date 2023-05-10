import asyncHandler from "express-async-handler";
import Recipe from "../model/recipeModel.js";

export const getAllRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
});

export const getRecipeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.findById(id);

  res.json(recipe);
});

export const createRecipe = asyncHandler(async (req, res) => {
  const { user } = req;

  const { title, time, servings, tags, ingredients, steps, basedOn } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  if (!time.prepTime) {
    res.status(400);
    throw new Error("Prep time is required");
  }

  if (!servings) {
    res.status(400);
    throw new Error("Servings is required");
  }

  if (ingredients.length === 0) {
    res.status(400);
    throw new Error("Ingredients are required");
  }

  if (steps.length === 0) {
    res.status(400);
    throw new Error("Steps are required");
  }

  const recipe = await Recipe.create({
    ...req.body,
    userId: user._id,
  });

  res.status(201).json(recipe);
});

export const updateRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const query = { _id: id, userId: user._id };
  const update = { $set: req.body };
  const options = { new: true };

  const recipe = await Recipe.findOneAndUpdate(query, update, options);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  res.json(recipe);
});

export const deleteRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const query = { _id: id, userId: user._id };

  const recipe = await Recipe.findOneAndDelete(query);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  res.json({ message: "Recipe deleted" });
});

// FOR ADMIN USE ONLY
// export const createRecipes = async (req, res) => {
//   const { recipes } = req.body;

//   const newRecipes = await Recipe.insertMany(recipes);

//   res.json(newRecipes);
// };
