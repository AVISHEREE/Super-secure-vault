import express from 'express';
import { signup, signin } from '../controller/auth.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import { deleteUser, updateUser } from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.route('/signup').post(signup);
userRouter.route('/signin').post(signin);
userRouter.route('/update-user').patch(verifyToken, updateUser);
userRouter.route('/delete-user').delete(verifyToken, deleteUser);

export default userRouter;
