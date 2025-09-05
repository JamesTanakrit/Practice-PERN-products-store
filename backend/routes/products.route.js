import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/test", getAllProducts);
router.post("/test", createProduct);

export default router;
