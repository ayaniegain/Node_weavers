import express, { json } from 'express';
import { DBConnect } from './DBConnect.js';
import productRoutes from "./routes/index.js"
const app = express();


app.use(json());


DBConnect().then(() => {
    console.log("mongoDB connect");
}).catch(() => {
    console.log("Mongodb Not connect");
})

// Routes
app.use('/api', productRoutes);

export default app;
