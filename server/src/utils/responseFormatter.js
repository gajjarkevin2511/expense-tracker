export const successResponse = (
  res,
  data,
  message = "Success",
  status = 200
) => {
  return res.status(status).json({
    ...(data ? { data } : {}),
    message,
    status,
  });
};

export const errorResponse = (res, error) => {
  return res.status(error.statusCode || 500).json({
    data: [],
    message: error.message || "An error occurred",
    status: error.statusCode || 500,
  });
};
