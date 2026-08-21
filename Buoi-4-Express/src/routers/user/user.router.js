import express from 'express';
import { userController } from '../../controllers/user.controller.js';
import multer from "multer"
import { uploadDiskStorage } from '../../common/multer/disk-storage.multer.js';
import { protect } from '../../common/middlewares/protect.middleware.js';

const userRouter = express.Router();

// const upload = multer({ dest: "image/" })
// Tạo route CRUD
userRouter.post('/avatar-local', protect, uploadDiskStorage.single("avatar"), userController.avatarLocal);
userRouter.post('/avatar-cloud', userController.avatarCloud);

export default userRouter;