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

const updateBlogIntoDB = async (
  payload: Partial<TBlog>,
  id: string,
  _id: string,
) => {
  // Check the user is exits or not
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'Author is not found');
  }

  // Check the blog is exits or not and belongs to the user
  const blog = await Blog.findOne({ _id, author: id });
  if (!blog) {
    throw new AppError(status.NOT_FOUND, 'Blog is not found');
  }

  const result = await Blog.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });

  // null check here
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'Blog not found after update');
  }

  // populate author after creating
  const populatedBlog = await result.populate('author');

  const { _id: blogId, title, content, author } = populatedBlog;


  return {
    _id: blogId,
    title,
    content,
    author,
  };
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
};
