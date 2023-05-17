const getRecipes = async ({ token }) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/recipes/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  console.log("data", data);

  return data;
};

const getByID = async ({ id, token }) => {
  console.log("id", id);

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/recipes/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  console.log(response.status);

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

const createRecipe = async ({ token, recipe }) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/recipes/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
    }
  );

  const data = await response.json();

  if (response.status !== 201) {
    throw new Error(data.message);
  }

  return data;
};

const updateRecipe = async ({ token, id, updatedRecipeFields }) => {
  console.log("updatedRecipeFields", updatedRecipeFields);
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/recipes/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedRecipeFields),
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

const deleteRecipe = async ({ token, id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/recipes/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (response.status !== 202) {
    throw new Error(data.message);
  }

  return data;
};

const recipeService = {
  getRecipes,
  getByID,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

export default recipeService;
