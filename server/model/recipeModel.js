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
});

export default mongoose.model("Recipe", recipeSchema);
