import { Schema, model } from "mongoose";

const { Types } = Schema;
const { ObjectId } = Types;

const recipeSchema = Schema({
  title: {
    type: String,
    required: [true, "Recipe title is required"],
  },
  userId: {
    type: ObjectId,
    ref: "User",
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
  tags: [String],
  ingredients: [
    {
      amount: Number,
      unit: String,
      optional: Boolean,
      id: {
        type: ObjectId,
        ref: "Ingredient",
        required: [true, "Ingredient ID is required"],
      },
    },
  ],
  steps: [String],
  basedOn: ObjectId,
});

export default model("Recipe", recipeSchema);
