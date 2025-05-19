import express from "express";
import productRoutes from "./routers/index.js";
import dbConnected from "./config/db.config.js";
const app = express();
app.use(express.json());

dbConnected()  // if i make just function call here? 
  .then(() => console.log('conncetion Successfull 🌎'))
  .catch(() =>   console.log("Mongodb Not connect"));


app.use("/api", productRoutes); //why product router ? 

export default app;
