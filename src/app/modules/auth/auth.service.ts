import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';

const createAdmin = async (payload: IUser) => {
  if (await User.isEmailExist(payload.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'An Admin already created, Email: dearmahmud.bd@gmail.com, Initial Password: 12345678, Please change the password',
    );
  }
  const result = await User.create(payload);
  if (!result) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Admin Not Created');
  }
  return result;
};

const registerUser = async (payload: IUser) => {
  if (await User.isEmailExist(payload.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'There is already a user registered with this email.',
    );
  }
  const result = await User.create(payload);

  const JwtPayload = {
    email: payload.email,
    role: result.role,
  };
  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_token as string,
    Number(config.jwt_access_token_expires),
  );

  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_token as string,
    Number(config.jwt_refresh_token_expires),
  );

  return { accessToken, refreshToken };
};

const loginUser = async (payload: IUser) => {
  const user = await User.isEmailExist(payload.email);
  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Enter your email and password correctly.',
    );
  }

  const isMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Enter your email and password correctly.',
    );
  }

  const JwtPayload = {
    email: payload.email,
    role: user.role,
  };
  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_token as string,
    Number(config.jwt_access_token_expires),
  );

  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_token as string,
    Number(config.jwt_refresh_token_expires),
  );

  return { accessToken, refreshToken };
};

export const AuthServices = {
  createAdmin,
  registerUser,
  loginUser,
};
