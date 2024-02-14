import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getFeedPosts,
  likeUnlikePost,
  replyToPost,
  getUserPosts,
} from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.patch('/like/:id', protectRoute, likeUnlikePost);
router.patch('/reply/:id', protectRoute, replyToPost);

router.get('/feed', protectRoute, getFeedPosts);
router.post('/', protectRoute, createPost);
router.get('/:id', getPost);
router.get('/user/:username', protectRoute, getUserPosts);
router.delete('/:id', protectRoute, deletePost);

export default router;
