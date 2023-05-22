import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipeByID,
  getRecipes,
  updateRecipe,
} from "../services/recipes/recipeSlice";
import { Auth } from "../components/Auth/Auth";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      Hello
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h1>{recipe.title}</h1>
          <button onClick={() => dispatch(getRecipeByID({ id: recipe._id }))}>
            Get Recipe By ID
          </button>
          <button
            onClick={() =>
              dispatch(
                updateRecipe({
                  id: recipe._id,
                  updatedRecipeFields: { title: `New ${recipe.title}` },
                })
              )
            }
          >
            Update Recipe
          </button>
        </div>
      ))}
    </div>
  );
};
