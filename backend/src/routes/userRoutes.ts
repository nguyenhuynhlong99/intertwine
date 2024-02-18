import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import {
  followUnfollowUser,
  getAllUsers,
  getCurrentUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', protectRoute, getAllUsers);
router.get('/whoami', protectRoute, getCurrentUser);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.patch('/follow/:id', protectRoute, followUnfollowUser);
router.patch('/update/:id', protectRoute, updateUser);
router.get('/:username', getUserProfile);

export default router;
