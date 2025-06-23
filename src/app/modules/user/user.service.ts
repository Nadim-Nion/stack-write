import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser, TUserLogin } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import createToken from './user.utils';

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
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

export const UserServices = {
  createUserIntoDB,
  userLogin,
};
