import  express from 'express'
const router = express.Router();
import productRouter from "./products/product.router.js";
import authRouter from "./auth/auth.router.js";
import uploadRouter from "./upload/upload.router.js";

router.use('/products',productRouter) 
router.use('/auth',authRouter)
router.use('/upload',uploadRouter)

export default router