import express from "express";
import {
  addExpense,
  getTopDays,
  getExpenses,
  getPercentage,
  updateExpenses,
  deleteExpenses,
  prediction,
} from "../controllers/expense.controller.js";
import { validateExpensePayload } from "../middlewares/validateExpensePayload.js";

const router = express.Router();

// Add an expense (with validation)
router.post("/", validateExpensePayload, addExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpenses);
router.delete("/:id", deleteExpenses);

// Update an expense (with validation)
router.put("/:id", validateExpensePayload, (req, res) => {
  // Add your updateExpense controller here
});

// Get top 3 days by total expenditure
router.get("/topDays/:id", getTopDays);
router.get("/percentage/:id", getPercentage);
router.get("/prediction/:id", prediction);

export default router;
