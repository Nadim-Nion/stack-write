import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User is registered successfully',
    statusCode: status.OK,
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
