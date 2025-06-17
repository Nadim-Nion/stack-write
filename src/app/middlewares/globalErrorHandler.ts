import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = 500;
  const message = err?.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
