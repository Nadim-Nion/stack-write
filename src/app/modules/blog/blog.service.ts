import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog, id: string) => {
  // Check the user is exits or not
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User is not found');
  }

  const result = await Blog.create({ ...payload, author: id });

  // populate author after creating
  const populatedBlog = await result.populate('author');

  const { _id, title, content, author } = populatedBlog;

  return {
    _id,
    title,
    content,
    author,
  };
};

export const BlogServices = {
  createBlogIntoDB,
};
