import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TError } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Setting the default values
  let statusCode = 500;
  let message = err?.message || 'Something went wrong';

  let error: TError = {
    details: { path: '', message: 'Something went wrong' },
  };

  // Checking whether the error is ZodError or not
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    // Reassign the variables with updated values
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    error = simplifiedError?.error;
  }
  // Check whether the error is mongoose error
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);

    // Reassign the variables with updated values
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    error = simplifiedError?.error;
  }

  // Ultimate response
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: err?.stack,
    // errorSources: err,
  });
};

export default globalErrorHandler;
