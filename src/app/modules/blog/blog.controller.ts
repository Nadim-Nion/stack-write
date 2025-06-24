import status from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const { id } = req.user;

  const result = await BlogServices.createBlogIntoDB(req.body, id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: blogId } = req.params;

  const result = await BlogServices.updateBlogIntoDB(req.body, userId, blogId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
};
