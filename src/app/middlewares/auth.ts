import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
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
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    // console.log("decoded:", decoded);

    // Check the user role from the decoded token exits in the required roles
    const { role, email } = decoded;

    // Check the user is exists ot not
    const user = await User.isUserExistsByEmail(email);
    // console.log('user:', user);
    if (!user) {
      throw new AppError(status.UNAUTHORIZED, 'Invalid Credentials');
    }

    // Check the user is blocked or not
    if (user && user.isBlocked) {
      throw new AppError(status.FORBIDDEN, 'User is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You are not authorized to access this resource',
      );
    }

    // Attach the decoded token to the request object
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
