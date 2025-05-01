import e from "express";
import Expense from "../models/expense.modal.js";
import { BadRequest } from "../utils/error.utils.js";

import { Op, fn, col, literal } from "sequelize";

export const getExpenses = async () => {
  return await Expense.findAll({
    attributes: ["id", "amount", "date", "description", "userId", "categoryId"],
    include: [
      {
        association: "User", // Assuming there is an association named 'User' in your Expense model
        attributes: ["id", "name"], // Include user details
      },
      {
        association: "Category", // Assuming there is an association named 'Category' in your Expense model
        attributes: ["id", "name"], // Include category details
      },
    ],
  });
};

export const addExpense = async (expenseData) => {
  try {
    const { userId, categoryId, date, amount, description } = expenseData;

    const newExpense = await Expense.create({
      userId,
      categoryId,
      date,
      amount,
      description,
    });

    return newExpense.dataValues;
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new BadRequest("Invalid userId or categoryId");
    }
    console.error("Error adding expense:", error);
    throw error;
  }
};

export const updateExpense = async (expenseId, expenseData) => {
  try {
    const { userId, categoryId, date, amount, description } = expenseData;
    const expense = await Expense.findByPk(expenseId);
    if (!expense) {
      throw new BadRequest("Expense not found");
    }
    await expense.update({
      userId,
      categoryId,
      date,
      amount,
      description,
    });
    return expense.dataValues;
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new BadRequest("Invalid userId or categoryId");
    }
    console.error("Error updating expense:", error);
    throw error;
  }
};

export const deleteExpense = async (expenseId) => {
  const expense = await Expense.findByPk(expenseId);
  if (!expense) {
    throw new BadRequest("Expense not found");
  }

  return await expense.destroy({ where: { expenseId } });
};

export const getTopDaysByExpenditure = async (userId) => {
  const expenses = await Expense.findAll({
    attributes: [
      [col("user.name"), "userName"],
      [fn("DATE", col("date")), "day"],
      [fn("SUM", col("amount")), "totalExpenditure"],
    ],
    include: [
      {
        association: "User", // Assuming there is an association named 'user' in your Expense model
        attributes: [],
      },
    ],
    where: { userId },
    group: ["user.name", literal("DATE(date)")],
    order: [[fn("SUM", col("amount")), "DESC"]],
    raw: true,
  });

  // Pick top 3 days for the user
  const topDays = expenses.slice(0, 3);
  return topDays;
};

export const predictionForNextMonth = async (userId) => {
  const expenses = await Expense.findAll({
    attributes: [
      [fn("SUM", col("amount")), "totalExpenditure"],
      [fn("DATE_FORMAT", col("date"), "%Y-%m"), "monthYear"],
    ],
    where: {
      userId,
      date: {
        [Op.gte]: fn("DATE_SUB", fn("CURDATE"), literal("INTERVAL 3 MONTH")),
      },
    },
    group: [fn("DATE_FORMAT", col("date"), "%Y-%m")],
    raw: true,
  });

  const totalExpenditure = expenses.reduce((sum, exp) => sum + parseFloat(exp.totalExpenditure || 0), 0);
  const averageExpenditure = totalExpenditure / 3;

  return { predictedNextMonthExpenditure: averageExpenditure };
};

export const getPercentageChangeForPreviousMonth = async (userId) => {
  const expenses = await Expense.findAll({
    attributes: [
      [fn("SUM", col("amount")), "totalExpenditure"],
      [fn("DATE_FORMAT", col("date"), "%Y-%m"), "monthYear"],
    ],
    where: {
      userId,
    },
    group: [fn("DATE_FORMAT", col("date"), "%Y-%m")],
    raw: true,
  });
  console.log(expenses, "expenses");

  // Sort by monthYear string format 'YYYY-MM'
  expenses.sort((a, b) => a.monthYear.localeCompare(b.monthYear));

  const percentageChanges = [];

  for (let i = 1; i < expenses.length; i++) {
    const currentMonth = expenses[i];
    const previousMonth = expenses[i - 1];

    const currentTotal = parseFloat(currentMonth.totalExpenditure || 0);
    const previousTotal = parseFloat(previousMonth.totalExpenditure || 0);
    let percentageChange =
      previousTotal === 0
        ? currentTotal > 0
          ? 100
          : 0
        : ((currentTotal - previousTotal) / previousTotal) * 100;

    // Ensure percentage change does not exceed 100%
    percentageChange = Math.min(percentageChange, 100);

    percentageChanges.push({
      fromMonth: previousMonth.monthYear,
      toMonth: currentMonth.monthYear,
      percentageChange: +percentageChange.toFixed(2),
    });
  }

  return percentageChanges;
};
