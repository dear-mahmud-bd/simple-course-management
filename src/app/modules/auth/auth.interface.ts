import { UserType } from '../user/user.interface';

export type IRegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export interface AuthenticatedUser {
  _id: string;
  name: string;
  email: string;
  role: UserType;
  iat: number;
  exp: number;
}
