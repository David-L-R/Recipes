import Recipe from "../model/recipeModel.js";

export const getAllRecipes = async (req, res) => {
  // go to MongoDB
  // fetch all recipes
  const recipes = await Recipe.find();
  res.status(200).json(recipes);
};

export const getRecipeById = (req, res) => {
  const { id } = req.params;
  res.json(id);
};

// DRY - create a reusable function/component
// One Responsibility Principle - Keep files short (~200)
//

export const createRecipe = async (req, res) => {
  const { user } = req;

  try {
    const { title } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const recipe = await Recipe.create({
      title,
      userId: user.id,
    });

    // 201: new entry to the database added
    res.status(201).json(recipe);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      stack: err.stack, //in developement
    });
  }
};

export const updateRecipe = (req, res) => {
  const { id } = req.params;
  res.json(id);
};

export const deleteRecipe = (req, res) => {
  const { id } = req.params;
  res.json(id);
};
