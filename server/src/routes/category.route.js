import express from "express";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { validateCategoryPayload } from "../middlewares/validateCategoryPayload.js";

const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Add a category (with Joi validation)
router.post("/", validateCategoryPayload, addCategory);

// Update a category (with Joi validation)
router.put("/:id", validateCategoryPayload, updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);

export default router;
