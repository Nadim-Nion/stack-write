/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TRole = 'admin' | 'user';

export interface TUser {
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

export interface UserModelType extends Model<TUser> {
  isUserExistsByEmail(email: string | undefined): Promise<TUser>;
  isCheckPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
