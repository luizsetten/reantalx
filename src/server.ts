import express from "express";
import { CategoriesRoutes } from "./routes/categories.routes";

const app = express();
app.use(express.json());

app.use("/categories", CategoriesRoutes);

app.listen(3333, () => console.log("Server is running!"));