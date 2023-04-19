import express from "express";
import recipesRouter from "./routes/recipesRouter.js";
import authRouter from "./routes/authRouter.js";
import { DBconnect } from "./config/db.js";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";

// init express application
const app = express();
const PORT = config.server.port || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

DBconnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const populateDatabase = () => {};

// ROUTES
app.use("/api/recipes", recipesRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

// listen to the port, to make sure that the app is running
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
