import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getAllProducts);      // GET all products
router.get("/:id", getProduct);       // GET single product
router.post("/", protect, createProduct);       // CREATE product
router.put("/:id", protect, updateProduct);     // UPDATE product
router.delete("/:id", protect, deleteProduct);  // DELETE product

export default router;
