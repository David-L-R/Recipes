import { Schema, model } from "mongoose";

const ingredientSchema = Schema({
  singular: {
    type: String,
    required: [true, "sigular form is required"],
  },
  plural: {
    type: String,
    required: [true, "Plural form is required"],
  },
});

export default model("Ingredient", ingredientSchema);
