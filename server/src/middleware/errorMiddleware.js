const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const showStack = process.env.NODE_ENV !== "production" && process.env.RENDER !== "true";

  res.status(statusCode).json({
    success: false,
    message: error.message || "Server error",
    ...(showStack ? { stack: error.stack } : {}),
  });
};

export { notFound, errorHandler };
