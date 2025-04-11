import express from 'express';
import {
  isAuth,
  login,
  logout,
  register,
  updateProfile,
  changePassword
} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

// Auth routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout', authUser, logout);

// ✅ Profile update route
userRouter.put('/update-profile', authUser, updateProfile);

// ✅ Change password route
userRouter.put('/change-password', authUser, changePassword);

export default userRouter;