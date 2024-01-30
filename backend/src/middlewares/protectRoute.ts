import { Request, Response, NextFunction } from 'express';
import getErrorMessage from '../utils/getErrorMessage.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

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
    const token = req.cookies.jwt;

    if (!token)
      return res.status(401).json({
        message: 'You are not logged in! Please log in to get access.',
      });

    const { userId } = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as JwtPayload;

    const user = await User.findById(userId);

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: getErrorMessage(err) });
    console.error(getErrorMessage(err));
  }
};

export default protectRoute;
