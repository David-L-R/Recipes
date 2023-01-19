import express from "express";
import recipesRouter from "./routes/recipesRoutes.js";

// init express application
const app = express();
const PORT = 5000;

// ROUTES
app.use("/api/recipes", recipesRouter);

// listen to the port, to make sure that the app is running
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
