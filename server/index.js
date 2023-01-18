import dotenv from "dotenv";
dotenv.config();
import recipeRouter from "./routes/recipes.js";
import { errorHandler } from "./middleware/error.js";
import express from "express";
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/recipes", recipeRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Port is running on: ${PORT}`));
