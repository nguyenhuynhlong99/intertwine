import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import {
  followUnfollowUser,
  getAllUsers,
  getAuthenticatedUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from '../controllers/userController.js';
import { limiter } from '../middlewares/rateLimit.js';

const router = express.Router();

router.get('/', protectRoute, getAllUsers);
router.get('/whoami', protectRoute, getAuthenticatedUser);
router.post('/signup', limiter, signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.patch('/follow/:id', protectRoute, followUnfollowUser);
router.patch('/update/:id', protectRoute, limiter, updateUser);
router.get('/:username', getUserProfile);

export default router;
