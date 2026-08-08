import express from "express"
import { articleController } from "../../controllers/article.controller.js"

const articleRouter = express.Router()

// READ
articleRouter.get("/",
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
articleRouter.post("", articleController.create)

//UPDATE
articleRouter.put("/:articleID", articleController.update)

//DELETE
articleRouter.delete("/:articleID", articleController.delete)
export default articleRouter