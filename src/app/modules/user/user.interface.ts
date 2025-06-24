/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { UserRole } from './user.constant';

export type TRole = 'admin' | 'user';

export interface TUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked: boolean;
}

export interface TUserLogin {
  email: string;
  password: string;
}

export type TUserRole = keyof typeof UserRole;
/* type TUserRole = {
  user: string;
  admin: string;
}; */

export interface UserModelType extends Model<TUser> {
  isUserExistsByEmail(email: string | undefined): Promise<TUser>;
  isCheckPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
