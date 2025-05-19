import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
} from "../../../controllers/product.controller.js";

router.get("/products", fetchAllProducts);

router.post("/addProduct", createProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
