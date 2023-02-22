import dotenv from "dotenv";
dotenv.config();
import recipeRouter from "./routes/recipes.js";
import userRouter from "./routes/users.js";
import { errorHandler } from "./middleware/error.js";
import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";

const { PORT } = process.env;

connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/recipes", recipeRouter);
app.use("/api/auth", userRouter);

// ERROR HANDLERS
app.use(errorHandler);

app.listen(PORT, () => console.log(`Port is running on: ${PORT}`));
