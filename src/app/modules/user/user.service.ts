import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser, TUserLogin } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import createToken from './user.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  const { _id, name, email } = result;

  return {
    _id,
    name,
    email,
  };
};

const userLogin = async (payload: TUserLogin) => {
  // Check the user is exists ot not
  const user = await User.isUserExistsByEmail(payload?.email);
  // console.log('user:', user);
  if (!user) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid Credentials');
  }

  // Check the user is blocked or not
  if (user && user.isBlocked) {
    throw new AppError(status.FORBIDDEN, 'User is blocked');
  }

  // Check the password is correct or not
  const isPasswordMatched = await User.isCheckPassword(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid Credentials');
  }

  // Generates Access Token after login
  const jwtPayload = {
    id: user?._id as Types.ObjectId,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // Generates Refresh token after login
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(
      status.UNAUTHORIZED,
      'You are not authorized to access this resource',
    );
  }

  // Check the token is valid or not
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  // console.log("decoded:", decoded);

  // Check the user role from the decoded token exits in the required roles
  const { email } = decoded;

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

  // Generates Access Token after hitting /refresh-token endpoint

  const jwtPayload = {
    id: user?._id as Types.ObjectId,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const UserServices = {
  createUserIntoDB,
  userLogin,
  refreshToken,
};
