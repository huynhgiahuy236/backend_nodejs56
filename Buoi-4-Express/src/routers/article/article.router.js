import express from "express"
import { articleController } from "../../controllers/article.controller.js"

const rootArticle = express.Router()

rootArticle.get("/", articleController.findAll)

export default rootArticle