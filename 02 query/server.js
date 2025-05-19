import chalk from "chalk";
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { router as productRoutes } from "./router/product.router.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(chalk.bgGreen(chalk.gray(`running on port no ⭐ ${PORT}`)));
});
