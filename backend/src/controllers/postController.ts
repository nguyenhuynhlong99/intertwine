import { NextFunction, Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../middlewares/protectRoute.js';
import Post from '../models/Post.js';
import getErrorMessage from '../utils/getErrorMessage.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';
import 'express-session';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

declare module 'express-session' {
  export interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}

const getPost = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text)
      throw createHttpError(400, 'Please provide all the fields');

    const user = await User.findById(postedBy);

    if (!user) throw createHttpError(404, 'User not found');

    if (user._id.toString() !== String(req.user?._id)) {
      throw createHttpError(401, 'Unauthorized to create post');
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      throw createHttpError(
        400,
        `Text muse be less than ${maxLength} characters`
      );
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const post = await Post.create({
      postedBy,
      text,
      img,
    });

    if (post) {
      res.status(201).json({
        post,
      });
    } else {
      throw createHttpError(400, 'Invalid post data');
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) throw createHttpError(404, 'Post not found');

    const userId = String(post.postedBy?._id);

    if (userId !== String(req.user?._id)) {
      throw createHttpError(401, 'Unauthorized to delete post');
    }

    if (post.img) {
      const imgId = post.img.split('/').pop()?.split('.')[0];
      await cloudinary.uploader.destroy(imgId || '');
    }

    await Post.findByIdAndDelete(req.params.id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const likeUnlikePost = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) throw createHttpError(404, 'User not found');

    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.likes?.includes(user._id)) {
      await Post.findByIdAndUpdate(req.params.id, {
        $pull: { likes: userId },
      });

      res.status(200).json({
        message: 'Unliked post successfully',
      });
    } else {
      post.likes?.push(user._id);
      await post.save();

      res.status(200).json({
        message: 'Liked post successfully',
      });
    }
  } catch (error) {
    next(error);
  }
};

const replyToPost = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;

    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (!user) throw createHttpError(404, 'User not found');

    if (!text) throw createHttpError(404, 'Text field required');

    const post = await Post.findById(postId);

    if (!post) throw createHttpError(404, 'Post not found');

    const reply = { user: userId, text };

    post.replies?.push(reply);
    await post.save();

    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
};

const deleteReply = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = String(req.user?._id);
    const postId = req.params.pid;
    const replyId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) throw createHttpError(404, 'Post not found');

    const replies = post?.replies;
    const replyToDelete = replies?.find((reply) => replyId);
    if (!replyToDelete) throw createHttpError(404, 'Reply not found');

    const replyUserId = replyToDelete.user?._id;

    if (String(replyUserId) !== userId)
      throw createHttpError(
        403,
        "You are not allow to delete other user's reply"
      );

    const updatedReplies = replies?.filter(
      (reply) => String(reply._id) !== replyId
    );

    post.replies = updatedReplies;
    await post.save();

    res.status(200).json({ message: 'Delete reply successfully' });
  } catch (error) {
    next(error);
  }
};

const getFeedPosts = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const following = user.following;

    const feed = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ status: 'success', feed });
  } catch (error) {
    next(error);
  }
};

const getUserPosts = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getUserReplies = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'No users found' });

    const userId = user?._id;

    const posts = await Post.find({ 'replies.user': { $eq: userId } });

    if (!posts) return res.status(404).json({ error: 'No replies found' });

    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
  deleteReply,
  getUserReplies,
};
