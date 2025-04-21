import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProducts,
  searchproducts
} from "../controller/product.controller.js";
const router = express.Router();

// Add routes
router.post("/create", createProduct);
router.get("/", getAllProducts);
router.get("/search", searchproducts);
router.get("/:id", getSingleProducts);

export { router };
