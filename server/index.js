import express from "express";
import recipesRouter from "./routes/recipesRoutes.js";

// init express application
const app = express();

// run that express on a port
const PORT = 5000;

// process routes
// david.com/api/users
// HTTP
// headers
// body
// GET | POST | PUT | DELETE (CRUD)
app.use("/api/recipes", recipesRouter);

// listen to the port, to make sure that the app is running
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
