import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Recipe title is required"],
  },
});

export default mongoose.model("Recipe", recipeSchema);
