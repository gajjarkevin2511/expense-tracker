import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Category name must be a string",
    "string.empty": "Category name is required",
    "any.required": "Category name is required",
  }),
});

export const validateCategoryPayload = (req, res, next) => {
  const { error } = categorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      data: [],
      message: error.details.map((err) => err.message).join(", "),
      status: 400,
    });
  }

  next(); // Proceed to the next middleware or controller
};