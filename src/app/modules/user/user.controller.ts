import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;
  const userData = req.user;
  const userEmail = userData.email;
  if (!email || !oldPassword || !newPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'email, oldPassword, newPassword -> This fields are required.');
  }
  const result = await UserServices.changeUserPassword(
    email,
    userEmail,
    oldPassword,
    newPassword,
  );
  sendResponse(res, {
    success: true,
    message: 'Password changed successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const myProfileData = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user;
  const userEmail = userData.email;
  const result = await UserServices.getProfileDataFromDB(userEmail);
  sendResponse(res, {
    success: true,
    message: 'Profile data retrieve successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});


export const UserControllers = {
  changePassword,
  myProfileData,
};
