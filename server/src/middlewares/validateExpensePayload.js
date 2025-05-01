import Joi from "joi";

const expenseSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    "number.base": "User ID must be a number",
    "number.integer": "User ID must be an integer",
    "any.required": "User ID is required",
  }),
  categoryId: Joi.number().integer().required().messages({
    "number.base": "Category ID must be a number",
    "number.integer": "Category ID must be an integer",
    "any.required": "Category ID is required",
  }),
  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date",
    "any.required": "Date is required",
  }),
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
    "any.required": "Amount is required",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
});

export const validateExpensePayload = (req, res, next) => {
  const { error } = expenseSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      data: [],
      message: error.details.map((err) => err.message).join(", "),
      status: 400,
    });
  }

  next();
};