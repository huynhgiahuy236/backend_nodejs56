import express from "express";
import rootArticle from "./article/article.router.js";

//Router: la 1 doi tuong cau express, dung de quan li cac route
const rootRouter = express.Router()


rootRouter.use("/article", rootArticle)
export default rootRouter