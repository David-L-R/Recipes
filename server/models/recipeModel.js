import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  favorites: [
    {
      charId: String,
      description: String,
    },
  ],
  title: {
    type: String,
    required: [true, "Recipe title is required"],
  },
});

export default mongoose.model("Recipe", recipeSchema);
