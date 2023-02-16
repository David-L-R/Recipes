export const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ?? 500;
  res.status = status;
  const { message, stack } = err;
  res.json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack }),
  });
};
