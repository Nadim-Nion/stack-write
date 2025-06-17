import { TUser } from './user.interface';
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

export const UserServices = {
  createUserIntoDB,
};
