import express from 'express';
import { authController } from '../../controllers/auth.controller.js';
import { protect } from '../../common/middlewares/protect.middleware.js';
import { protectv2 } from '../../common/middlewares/protectv2.middleware.js';
import { limitLogin } from '../../common/middlewares/rateLimit.middleware.js';

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post('/register', authController.register);
authRouter.post('/login', limitLogin, authController.login);
authRouter.get("/get-info", protect, authController.getInfo)
authRouter.post("/refresh-token", authController.refreshToken)
authRouter.post("/auth/google")
// authRouter.get("/get-info", protectv2, authController.getInfo)
export default authRouter;
