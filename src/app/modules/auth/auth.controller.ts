import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';
import { UserType } from '../user/user.interface';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const userData = {
    name: 'Md. Mahmudul Hasan' as string,
    email: 'dearmahmud.bd@gmail.com' as string,
    password: '12345678' as string,
    role: UserType.admin,
  };
  const result = await AuthServices.createAdmin(userData);
  sendResponse(res, {
    success: true,
    message: 'Admin created successfully. Please Change The Password',
    statusCode: httpStatus.CREATED,
    data: {
      message: 'Please Change The Password',
      password: '12345678',
      result: { name: result.name, email: result.email, role: result.role },
    },
  });
});
const register = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await AuthServices.registerUser(userData);
  const { refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'Login Successful',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'Logout successful',
    statusCode: httpStatus.OK,
    data: null,
  });
});

export const AuthControllers = {
  createAdmin,
  register,
  login,
  logout,
};
