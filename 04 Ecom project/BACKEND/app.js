import express from "express";
import cors from "cors";
import appRoutes from "./routers/index.js";
import dbConnected from "./config/db.config.js";
const app = express();
app.use(express.json());

dbConnected()  
  .then(() => console.log('conncetion Successfull 🌎'))
  .catch(() =>   console.log("Mongodb Not connect"));


  app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));



app.use("/api", appRoutes);

export default app;
