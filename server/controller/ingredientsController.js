import Ingredient from "../model/ingredientModel.js";
import asyncHandler from "express-async-handler";

export const getAllIngredients = asyncHandler(async (req, res) => {
  const recipes = await Ingredient.find();
  res.status(200).json(recipes);
});

export const getIngredientById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const recipe = await Ingredient.findById(id);

  res.status(200).json(recipe);
});

export const createIngredient = asyncHandler(async (req, res) => {
  const { singular, plural } = req.body;

  const newIngredient = await Ingredient.create({ singular, plural });

  res.status(201).json(newIngredient);
});

export const updateIngredient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { singular, plural } = req.body;

  if (!singular || !plural) {
    res.status(400);
    throw new Error("Ingredient must have a singular and plural name");
  }

  const updatedIngredient = await Ingredient.findByIdAndUpdate(id, {
    singular,
    plural,
  });

  res.status(200).json(updatedIngredient);
});

export const deleteIngredient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedIngredient = await Ingredient.findByIdAndDelete(id);

  res.status(200).json(deletedIngredient);
});

export const createIngredients = async (req, res) => {
  const { ingredients } = req.body;

  const newIngredients = await Ingredient.insertMany(ingredients);
  res.status(201).json(newIngredients);
};
