import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export enum UserType {
  user = 'user',
  admin = 'admin',
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<IUser> {
  isEmailExist(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
