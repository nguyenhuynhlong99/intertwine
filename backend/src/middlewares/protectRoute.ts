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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // try {
  //   const token = req.cookies.jwt;

  //   if (!token)
  //     return res.status(401).json({
  //       message: 'Unauthorized',
  //     });

  //   const decoded = jwt.verify(token, String(env.JWT_SECRET)) as JwtPayload;

  //   const user = await User.findById(decoded.userId);

  //   req.user = user;

  //   next();
  // } catch (err) {
  //   res.status(500).json({ message: getErrorMessage(err) });
  //   console.error(getErrorMessage(err));
  // }
  if (req.session.userId) {
    next();
  } else {
    next(createHttpError(401, 'User not authenticated'));
  }
};

export default protectRoute;
