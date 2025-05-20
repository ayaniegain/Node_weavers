import express from "express";
import appRoutes from "./routers/index.js";
import dbConnected from "./config/db.config.js";
const app = express();
app.use(express.json());

dbConnected()  
  .then(() => console.log('conncetion Successfull 🌎'))
  .catch(() =>   console.log("Mongodb Not connect"));


app.use("/api", appRoutes);

export default app;
