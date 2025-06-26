import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const blockUser = async (userId: string) => {
  // Check if the user exits
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(status.INTERNAL_SERVER_ERROR, 'Failed to block user');
  }
};

export const AdminService = {
  blockUser,
};
