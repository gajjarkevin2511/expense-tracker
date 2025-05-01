import {
  getExpenses as getExpensesService,
  addExpense as addExpenseService,
  updateExpense as updateExpenseService,
  deleteExpense as deleteExpenseService,
  getTopDaysByExpenditure,
  getPercentageChangeForPreviousMonth,
  predictionForNextMonth,
} from "../service/expense.service.js";
import { successResponse, errorResponse } from "../utils/responseFormatter.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await getExpensesService();
    return successResponse(res, expenses, "Expenses fetched successfully");
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};
export const addExpense = async (req, res) => {
  try {
    const newExpense = await addExpenseService(req.body);
    return successResponse(res, newExpense, "Expense added successfully", 201);
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};
export const updateExpenses = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const updatedExpense = await updateExpenseService(expenseId, req.body);
    return successResponse(res, updatedExpense, "Expense updated successfully");
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};
export const deleteExpenses = async (req, res) => {
  try {
    const expenseId = req.params.id; 
    await deleteExpenseService(expenseId);
    return successResponse(res, null, "Expense deleted successfully");
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};

export const getTopDays = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you have user ID in the request object

    const topDays = await getTopDaysByExpenditure(userId);
    return successResponse(
      res,
      topDays,
      "Top 3 days by total expenditure fetched successfully"
    );
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};
export const getPercentage = async (req, res) => {
  try {
    const userId = req.params.id; 

    const topDays = await getPercentageChangeForPreviousMonth(userId);
    return successResponse(
      res,
      topDays,
      "percentage change for previous month fetched successfully"
    );
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};

export const prediction = async (req, res) => {
  try {
    const userId = req.params.id; 

    const topDays = await predictionForNextMonth(userId);
    return successResponse(
      res,
      topDays,
      "prediction for next month fetched successfully"
    );
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};
