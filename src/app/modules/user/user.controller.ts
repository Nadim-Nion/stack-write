import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User is registered successfully',
    statusCode: status.OK,
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await UserServices.userLogin(req.body);

  const { accessToken: token, refreshToken } = result;

  // Set the refresh token in the cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: status.OK,
    data: {
      token,
    },
  });
});

export const UserControllers = {
  createUser,
  userLogin,
};
