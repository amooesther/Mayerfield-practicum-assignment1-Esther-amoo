// Centralized error handling middleware

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    status: 'error',
    message: `Not Found - ${req.originalUrl}`,
  });
}

export function errorHandler(err, req, res, next) {
  console.error("Server Error:", err);

  const statusCode = res.statusCode !== 200 && res.statusCode !== 204 ? res.statusCode : 500;
  const isProduction = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    status: 'error',
    message: isProduction && statusCode === 500
      ? 'An internal server error occurred'
      : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
}

