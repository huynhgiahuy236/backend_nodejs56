import express from "express"
import { articleController } from "../../controllers/article.controller.js"

const rootArticle = express.Router()

rootArticle.get("/",
    (req, res, next) => {
        if (3 > 2) {
            res.json({ message: "loi" })
        } else {
            const payload = "Thông tin token"
            req.info = payload
            next()
        }
        // console.log("middleware-1")
        // next();
    },
    (req, res, next) => {
        console.log("middleware-2")
        console.log(req.info)
        next();
    }, articleController.findAll)

export default rootArticle