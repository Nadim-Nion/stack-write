/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // formatting the error in consistent pattern

  // Extract the value from the string
  const text = err.errorResponse.errmsg;
  const result = text.match(/"([^"]*)"/);

  // Capture the 2nd the item
  const extractedMessage = result && result[1];

  const error: TError = {
    details: {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  };

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleDuplicateError;
