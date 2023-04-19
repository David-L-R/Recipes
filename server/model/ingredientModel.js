import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Recipe title is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User ID is required"],
  },
  time: {
    prepTime: {
      type: Number,
      required: [true, "Prep time is required"],
    },
    cookTime: {
      type: Number,
    },
  },
  servings: Number,
  ingredients: [
    {
      amount: Number,
      unit: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Ingredient ID is required"],
      },
    },
  ],
});

export default mongoose.model("Recipe", recipeSchema);
