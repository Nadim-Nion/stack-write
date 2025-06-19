import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser, TUserLogin } from './user.interface';
import { User } from './user.model';

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
  console.log('user:', user);
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

  return user;
};

export const UserServices = {
  createUserIntoDB,
  userLogin,
};
