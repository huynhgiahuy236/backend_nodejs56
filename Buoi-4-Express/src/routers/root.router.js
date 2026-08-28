import express from "express";
import articleRouter from "./article/article.router.js";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import chatGroupRouter from "./chat/chatGroup.router.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import chatMessagesRouter from "./chat/chatMessage.router.js";

//Router: la 1 doi tuong cau express, dung de quan li cac route
const rootRouter = express.Router()


rootRouter.use("/article", articleRouter)

rootRouter.use("/auth", authRouter)


rootRouter.use("/user", userRouter)

rootRouter.use("/chat-group", protect, chatGroupRouter)

rootRouter.use("/chat-message", protect, chatMessagesRouter)
export default rootRouter