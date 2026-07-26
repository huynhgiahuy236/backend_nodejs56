import { articleService } from "../services/article.service.js"

export const articleController = {
    async findAll(req, res) {
        // dieu huong ve services de xu li nghiep vu
        const result = await articleService.findAll(req, res)

        // tra du lieu ve cho client
        res.json(result)
    }
}