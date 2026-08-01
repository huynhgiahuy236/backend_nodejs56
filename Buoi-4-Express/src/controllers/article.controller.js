import { responseSuccess } from "../common/helpers/response.helper.js";
import { articleService } from "../services/article.service.js"

export const articleController = {
    async findAll(req, res) {
        // dieu huong ve services de xu li nghiep vu
        const result = await articleService.findAll(req, res)

        // tra du lieu ve cho client
        const respose = responseSuccess("Lấy danh sách bài viết thành công", result)
        res.json(respose);
    }
}