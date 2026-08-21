import express from 'express';
import { userController } from '../../controllers/user.controller.js';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post('/avatar-local', userController.avatarLocal);
userRouter.post('/avatar-cloud', userController.avatarCloud);

export default userRouter;