const getAllRecipes = async (req, res) => res.send("get all");
const getRecipeById = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.text) {
      //   res.status(400);
      const error = new Error("an error");
      error.status = 400;
      throw error;
      //   throw new Error("an error");
    }

    res.send({ message: req.body });
  } catch (err) {
    console.log(err.status);
    res.status(err.status).send({
      message: err.message,
      stack: err.stack,
    });
  }
};
const addNewRecipe = async (req, res) => res.send("post " + req.params.id);
const replaceRecipe = async (req, res) => res.send("put " + req.params.id);
const updateRecipe = async (req, res) => res.send("patch " + req.params.id);
const deleteRecipe = async (req, res) => res.send("delete " + req.params.id);

export {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
  replaceRecipe,
  updateRecipe,
  deleteRecipe,
};
