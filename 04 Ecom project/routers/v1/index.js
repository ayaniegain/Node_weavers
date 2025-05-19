import  express from 'express'
const router = express.Router();
import productRouter from "./products/product.router.js";

router.use('/',productRouter) // here i can give some best /name? 

export default router