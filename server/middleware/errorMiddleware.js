export const errorHandler = (err, req, res, next) => {
  if (res.statusCode === 200) {
    res.status(500);
  }

  // if there was a status code, use it, otherwise use 500
  const statusCode = res.statusCode || 500;
  // send the error message, and the stack trace if in development
  const { message, stack } = err;

  res.status(statusCode).json({
    message,
    // stack: process.env.NODE_ENV === "production" ? "🥞" : stack,
    ...(process.env.NODE_ENV === "development" && { stack }),
  });
};
