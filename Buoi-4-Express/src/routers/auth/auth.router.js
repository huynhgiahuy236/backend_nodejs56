import express from 'express';
import { authController } from '../../controllers/auth.controller.js';

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get("/get-info", authController.getInfo)
export default authRouter;