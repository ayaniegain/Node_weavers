import ProductsRouter from "./products/product.router.js"
import {Router} from "express"

const router = Router()
router.use("/",ProductsRouter)
export default router