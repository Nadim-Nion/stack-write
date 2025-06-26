import status from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await AdminService.blockUser(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User blocked successfully',
    // data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminService.deleteBlog(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
