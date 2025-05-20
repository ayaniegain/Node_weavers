import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
} from "../../../controllers/product.controller.js";

router.get("/", fetchAllProducts);

router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;
