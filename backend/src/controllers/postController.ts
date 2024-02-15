import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../middlewares/protectRoute.js';
import Post from '../models/Post.js';
import getErrorMessage from '../utils/getErrorMessage.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';

const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error(error);
  }
};

const createPost = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text)
      return res.status(400).json({ error: 'Please fill all the fields' });

    const user = await User.findById(postedBy);

    if (!user) return res.status(400).json({ error: 'User not found' });

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized to create post' });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ error: `Text muse be less than ${maxLength} characters` });
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
      res.status(400).json({ error: 'Invalid post data' });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error(error);
  }
};

const deletePost = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    const userId = String(post.postedBy?._id);

    if (userId !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized to delete post' });
    }

    console.log(post);

    if (post.img) {
      const imgId = post.img.split('/').pop()?.split('.')[0];
      await cloudinary.uploader.destroy(imgId || '');
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(204).json({ message: 'Deleted post successfully' });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error(error);
  }
};

const likeUnlikePost = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.likes?.includes(userId)) {
      await Post.findByIdAndUpdate(req.params.id, {
        $pull: { likes: userId },
      });

      res.status(200).json({
        message: 'Unliked post successfully',
      });
    } else {
      post.likes?.push(userId);
      await post.save();

      res.status(200).json({
        message: 'Liked post successfully',
      });
    }
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error(error);
  }
};

const replyToPost = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;

    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) return res.status(400).json({ error: 'Text field is required' });

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    const reply = { userId, text, userProfilePic, username };

    post.replies?.push(reply);
    await post.save();

    res.status(200).json({ message: 'Replied to post successfully', post });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error(error);
  }
};

const getFeedPosts = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const following = user.following;

    const feed = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ status: 'success', feed });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error(error);
  }
};

const getUserPosts = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
    console.error(error);
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
};
