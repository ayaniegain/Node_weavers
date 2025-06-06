import express from "express";
const router = express.Router();

import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
} from "../../../controllers/product.controller.js";
import { authmiddleWare } from "../../../middleware/auth.middleware.js";

router.get("/", fetchAllProducts);

router.post("/", createProduct);
router.delete("/:id", authmiddleWare, deleteProduct);

export default router;
