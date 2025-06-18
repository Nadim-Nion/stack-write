import { ZodError, ZodIssue } from 'zod';
import { TError, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  // formatting the error in consistent pattern
  const firstIssue: ZodIssue = err.issues[0];

  const error: TError = {
    details: {
      path: firstIssue?.path[firstIssue.path.length - 1],
      message: firstIssue?.message,
    },
  };

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleZodError;
