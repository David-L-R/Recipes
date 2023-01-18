import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

const getAllRecipes = asyncHandler(async (req, res) => {
  try {
    const recipes = await Recipe.find();
    console.log(recipes);
  } catch (err) {
    res.status(err.statusCode);
    throw new Error(err.message);
  }
});
const getRecipeById = asyncHandler(async (req, res) => {
  try {
    console.log(recipes);

    const recipes = await Recipe.findById(req.params.id);

    if (!req.body.text) {
      res.status(400);
      //   const error = new Error("an error");
      //   error.status = 400;
      //   throw error;
      throw new Error("an error");
    }

    res.send({ message: req.body });
  } catch (err) {
    //     console.log(err.status);
    //     res.status(err.status).send({
    //       message: err.message,
    //       stack: err.stack,
    //   });
    throw err;
  }
});
const addNewRecipe = async (req, res) => res.send("post " + req.params.id);
const replaceRecipe = async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
};
const updateRecipe = async (req, res) => res.send("patch " + req.params.id);
const deleteRecipe = async (req, res) => res.send("delete " + req.params.id);

export {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  replaceRecipe,
  updateRecipe,
  deleteRecipe,
};
