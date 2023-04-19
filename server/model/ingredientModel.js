import { Schema, model } from "mongoose";

const { ObjectId } = ({ Types } = Schema);
// const { ObjectId } = Types;

const recipeSchema = Schema({
  singular: {
    type: String,
    required: [true, "Recipe title is required"],
  },
  plural: {
    type: ObjectId,
    required: [true, "User ID is required"],
  },
});

export default model("Recipe", recipeSchema);
