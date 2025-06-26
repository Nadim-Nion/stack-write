import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { blogSearchableFields } from './blog.constant';

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  /*
  {title: {$regex: query?.search, $options: "i"}}
  {content: {$regex: query?.search, $options: "i"}}
  */

  // Searching
  const searchConditions = query?.search
    ? {
        $or: blogSearchableFields.map((field) => ({
          [field]: { $regex: query?.search, $options: 'i' },
        })),
      }
    : {};

  // Filtering
  const filterCondition = query?.filter ? { author: query?.filter } : {};

  // Merging search and filter conditions
  const finalQuery = {
    ...searchConditions,
    ...filterCondition,
  };

  // Sorting
  const sortBy = query?.sortBy || 'createdAt';
  const sortOrder = query?.sortOrder === 'desc' ? -1 : 1;

  const result = await Blog.find(finalQuery)
    .populate('author')
    .sort({ [sortBy as string]: sortOrder })
    .select('_id title content author');

  return result;
};

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
    throw new AppError(
      status.NOT_FOUND,
      'Blog is not found or does not belong to the user',
    );
  }

  const result = await Blog.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });

  // null check here
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'Blog not found after update');
  }

  // populate author after updating
  const populatedBlog = await result.populate('author');

  const { _id: blogId, title, content, author } = populatedBlog;

  return {
    _id: blogId,
    title,
    content,
    author,
  };
};

const deleteBlogFromDB = async (userId: string, blogId: string) => {
  // Check the user is exits or not
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'Author is not found');
  }

  // Check the blog is exits or not and belongs to the user
  const blog = await Blog.findOne({ _id: blogId, author: userId });
  if (!blog) {
    throw new AppError(status.NOT_FOUND, 'Blog is not found');
  }

  const result = await Blog.findByIdAndDelete(blogId);

  // If the document is not found for deletion
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'Failed to delete blog');
  }
};

export const BlogServices = {
  getAllBlogsFromDB,
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
