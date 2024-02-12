import { Request, Response } from 'express';
import User from '../models/User.js';
import getErrorMessage from '../utils/getErrorMessage.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { IGetUserAuthInfoRequest } from 'middlewares/protectRoute.js';
import { v2 as cloudinary } from 'cloudinary';

const createTokenSetCookie = (userId: Types.ObjectId, res: Response) => {
  const token = jwt.sign({ userId }, String(process.env.JWT_SECRET), {
    expiresIn: '3d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
    sameSite: 'strict', //CSRF
  });

  return token;
};

const signupUser = async (req: Request, res: Response) => {
  const { email, username, password, name } = req.body;

  try {
    const user = await User.signUp(email, password, username, name);

    createTokenSetCookie(user._id, res);

    user.password = null;

    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
    console.error(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);

    createTokenSetCookie(user._id, res);

    user.password = null;

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
    console.error(error);
  }
};

const logoutUser = (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.log(error);
  }
};

const followUnfollowUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: 'You can not follow/unfollow yourself' });

    if (!userToModify || !currentUser)
      return res.status(404).json({ error: 'User not found' });

    const isFollowing = await currentUser.following?.includes(id);

    if (isFollowing) {
      // unfollow user
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { followers: req.user._id },
      });
      res.status(200).json({ message: 'Unfollowed user successfully' });
    } else {
      // follow user
      await User.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $push: { followers: req.user._id },
      });
      res.status(200).json({ message: 'Followed user successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error('Error in followUnfollowUser: ', getErrorMessage(error));
  }
};

const updateUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { name, email, username, password, bio } = req.body;
    let { profilePic } = req.body;

    let user = await User.findById(userId).select('+password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You can not update other user's profile" });

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

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error('Error in updateUser: ', getErrorMessage(error));
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select('-updatedAt');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error('Error in updateUser: ', getErrorMessage(error));
  }
};

const getCurrentUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).exec();
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error('Error in updateUser: ', getErrorMessage(error));
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getUserProfile,
  getCurrentUser,
};
