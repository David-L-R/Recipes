import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByID, getRecipes } from "../services/recipes/recipeSlice";
import { Recipe } from "../components/Recipe/Recipe";

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
        <Recipe
          key={recipe._id}
          recipe={recipe}
          getById={() => dispatch(getRecipeByID({ id: recipe._id }))}
        />
      ))}
    </div>
  );
};
