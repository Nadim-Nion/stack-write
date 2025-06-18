import mongoose from 'mongoose';
import { TError } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  // formatting the error in consistent pattern
  const errorObj: mongoose.Error.ValidatorError | mongoose.Error.CastError =
    err.errors.name;

  const error: TError = {
    details: {
      path: errorObj?.path,
      message: errorObj?.message,
    },
  };

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleValidationError;
