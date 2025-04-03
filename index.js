import chalk from "chalk";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

let app = express();

let PORT = process.env.PORT;

app.get("/hello", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(PORT, () => {
  console.log(chalk.bgRed(chalk.gray(`running on port no `, PORT)));
});
