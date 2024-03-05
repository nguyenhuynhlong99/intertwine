import { Request, Response, NextFunction } from 'express';
import getErrorMessage from '../utils/getErrorMessage.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from '../utils/validateEnv.js';
import createHttpError from 'http-errors';

export interface IGetUserAuthInfoRequest extends Request {
  user?: any; // or any other type
}

interface JwtPayload {
  userId: string;
}

const protectRoute = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) throw createHttpError(403, 'Unauthorized');

    if (req.headers.authorization.startsWith('Bearer ')) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
      const user = await User.findById(decoded.userId);
      req.user = user;
    }
    next();
  } catch (error) {
    next(error);
  }

  // if (req.session.userId) {
  //   next();
  // } else {
  //   next(createHttpError(401, 'User not authenticated'));
  // }
};

export default protectRoute;
