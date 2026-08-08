import express from "express";
import articleRouter from "./article/article.router.js";

//Router: la 1 doi tuong cau express, dung de quan li cac route
const rootRouter = express.Router()


rootRouter.use("/article", articleRouter)
export default rootRouter