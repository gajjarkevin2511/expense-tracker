import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "User name must be a string",
    "string.empty": "User name is required",
    "any.required": "User name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  status: Joi.string().required().messages({
    "string.base": "Status must be a string",
    "string.empty": "Status is required",
    "any.required": "Status is required",
  }),
});

export const validateUserPayload = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      data: [],
      message: error.details.map((err) => err.message).join(", "),
      status: 400,
    });
  }

  next();
};