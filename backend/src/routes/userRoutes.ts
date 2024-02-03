import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import {
  followUnfollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/profile/:username', getUserProfile);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

router.use(protectRoute);

router.patch('/follow/:id', followUnfollowUser);
router.patch('/update/:id', updateUser);

export default router;
