import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Check the token is sent in the request header
    const token = req.headers.authorization;
    // console.log({ token });
    if (!token) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You are not authorized to access this resource',
      );
    }

    // Check the token is valid or not
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    if (!decoded) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You are not authorized to access this resource',
      );
    }
    // console.log("decoded:", decoded);
    // Attach the decoded token to the request object
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
