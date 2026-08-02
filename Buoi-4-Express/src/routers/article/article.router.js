import express from "express"
import { articleController } from "../../controllers/article.controller.js"

const rootArticle = express.Router()

// READ
rootArticle.get("/",
    (req, res, next) => {
        if (3 > 2) {
            console.log("middleware-1")
            next()
        } else {
            throw new Error("error")
            const payload = "Thông tin token được lấy"
            req.info = payload
            console.log(req.info)
        }
    },
    articleController.findAll)

//CREATE
rootArticle.post("", articleController.create)

//UPDATE
rootArticle.put("/:articleID", articleController.update)

//DELETE
rootArticle.delete("/:articleID", articleController.delete)
export default rootArticle