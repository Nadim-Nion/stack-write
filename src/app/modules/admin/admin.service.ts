import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';

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

  return result;
};

const deleteBlog = async (id: string) => {
  // Check if the blog exits
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(status.NOT_FOUND, 'Blog not found');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminService = {
  blockUser,
  deleteBlog,
};
