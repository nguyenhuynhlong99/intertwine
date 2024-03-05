import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import getErrorMessage from '../utils/getErrorMessage.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';
import { IGetUserAuthInfoRequest } from 'middlewares/protectRoute.js';
import { v2 as cloudinary } from 'cloudinary';
import 'express-session';
import env from '../utils/validateEnv.js';
import createHttpError from 'http-errors';

declare module 'express-session' {
  export interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}

const createToken = (userId: Types.ObjectId) => {
  const token = jwt.sign({ userId }, String(env.JWT_SECRET), {
    expiresIn: '5h',
  });

  return token;
};

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password, name } = req.body;

  try {
    const user = await User.signUp(email, password, username, name);

    const token = createToken(user._id);
    // req.session.userId = user._id;

    user.password = null;

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);
    // req.session.userId = user._id;

    user.password = null;

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

const followUnfollowUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?._id;

    const userToModify = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (id === String(currentUserId))
      throw createHttpError(400, "'You can not follow/unfollow yourself'");

    if (!userToModify || !currentUser)
      throw createHttpError(404, 'User not found');

    const isFollowing = currentUser.following?.includes(id);

    if (isFollowing) {
      // unfollow user
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { followers: currentUserId },
      });
      res.status(200).json({ message: 'Unfollowed user successfully' });
    } else {
      // follow user
      await User.findByIdAndUpdate(currentUserId, {
        $push: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $push: { followers: currentUserId },
      });
      res.status(200).json({ message: 'Followed user successfully' });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const { name, email, username, password, bio } = req.body;
    let { profilePic } = req.body;

    let user = await User.findById(userId).select('+password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (req.params.id !== String(userId))
      throw createHttpError(400, "You can not update other user's profile");

    if (password) {
      const hashedPassword = await User.hashPassword(password);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        const userProfilePic = user.profilePic.split('/').pop()?.split('.')[0];
        await cloudinary.uploader.destroy(userProfilePic || '');
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    user = await User.findById(user._id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select('-updatedAt');
    if (!user) throw createHttpError(404, 'User not found');

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAuthenticatedUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId);

    if (!user) throw createHttpError(404, 'User not found');

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B) Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    if (queryObj.username) {
      queryObj.username = { $regex: queryObj.username, $options: 'i' };
    }

    let query = User.find({
      ...queryObj,
      _id: { $ne: userId },
    });

    //Sort
    if (req.query.sort) {
      const sortQuery = String(req.query.sort);
      const sortBy = sortQuery.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //Limiting fields
    if (req.query.fields) {
      const fields = String(req.query.fields).split(',').join(' ');
      query = query.select(fields);
    } else {
      query.select('-__v');
    }

    /* Pagination */
    const page = parseInt(String(req.query.page)) || 1;
    const limit = parseInt(String(req.query.limit)) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const usersCount = await User.countDocuments();
      if (skip >= usersCount) {
        return res.status(404).json({ error: 'Page not found' });
      }
    }

    const users = await query;

    if (!users) return res.status(404).json({ error: 'Users not found!' });

    res.status(200).json({
      users,
      total: users.length,
      page,
      limit,
      totalPages: Math.ceil(users.length / limit),
    });
  } catch (error) {
    next(error);
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getUserProfile,
  getAuthenticatedUser,
  getAllUsers,
};
