import { RequestHandler } from 'express';
import status from 'http-status';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const notFound: RequestHandler = (req, res, next) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'Route is not found',
    error: '',
  });
};

export default notFound;
