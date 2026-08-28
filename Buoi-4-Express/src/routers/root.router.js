import express from "express";
import articleRouter from "./article/article.router.js";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import chatGroupRouter from "./chat/chatGroup.router.js";

//Router: la 1 doi tuong cau express, dung de quan li cac route
const rootRouter = express.Router()


rootRouter.use("/article", articleRouter)

rootRouter.use("/auth", authRouter)


rootRouter.use("/user", userRouter)

rootRouter.use("/chat-group", chatGroupRouter)
export default rootRouter