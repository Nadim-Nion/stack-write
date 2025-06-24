import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const createToken = (
  jwtPayload: { id: Types.ObjectId; role: string },
  secretKey: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn,
  } as jwt.SignOptions);
};

export default createToken;
