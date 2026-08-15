import express from 'express';
import { authController } from '../../controllers/auth.controller.js';
import { protect } from '../../common/middlewares/protect.middleware.js';
import { protectv2 } from '../../common/middlewares/protectv2.middleware.js';
import { limitLogin } from '../../common/middlewares/rateLimit.middleware.js';
import passport from 'passport';

const authRouter = express.Router();

// Tạo route CRUD
authRouter.post('/register', authController.register);
authRouter.post('/login', limitLogin, authController.login);
authRouter.get("/get-info", protect, authController.getInfo)
authRouter.post("/refresh-token", authController.refreshToken)
// khi user click vao login gg - api login gg se dc kich hoat
// passport kich hoat va redirect user toi trang chon tai khoan gg, dong thoi gui scope ma minh da yeu cau
authRouter.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
// authRouter.get("/get-info", protectv2, authController.getInfo)
export default authRouter;
