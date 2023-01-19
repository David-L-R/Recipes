import express from "express";
const router = express.Router();

// /api/recipes
// GET all recipes
// only some fields - quicker fetching

router.get("/", (request, response) => {
  response.json("/api/recipes/ works");
});

// GET a recipe by id
// fetch all information

// CREATE a recipe
// TODO: AUTH

// UPDATE a recipe
// TODO: AUTH

// DELETE a recipe
// TODO: AUTH

// const get = (path, callback) => {
//   // do stuff

//   const req = {};
//   const res = {};

//   callback(req, res);
// };

export default router;
