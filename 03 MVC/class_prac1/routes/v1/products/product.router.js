import express from 'express';
import { createProduct, fetchAllProducts } from "../../../controllers/productController.js"

const router = express.Router();

router.get('/products', fetchAllProducts);
router.post('/addProduct', createProduct);

export default router;
