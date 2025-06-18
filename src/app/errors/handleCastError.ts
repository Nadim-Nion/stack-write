import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  // formatting the error in consistent pattern
  const error: TError = {
    details: {
      path: err?.path,
      message: err?.message,
    },
  };

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleCastError;
