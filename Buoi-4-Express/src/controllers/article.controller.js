import { responseSuccess } from "../common/helpers/response.helper.js";
import { statusCodes } from "../common/helpers/statusCode.helper.js";
import { articleService } from "../services/article.service.js"

export const articleController = {
    async findAll(req, res) {
        // dieu huong ve services de xu li nghiep vu
        const result = await articleService.findAll(req, res)

        // tra du lieu ve cho client
        const response = responseSuccess(result, "Lấy danh sách bài viết thành công")
        res.status(response.statusCode).json(response)
    },
    async create(req, res) {
        const result = await articleService.create(req);
        const response = responseSuccess(
            "Tạo bài viết thành công",
            result,
            statusCodes.CREATED,
        );
        res.status(response.statusCode).json(response)
    },
    async update(req, res) {
        const result = await articleService.update(req);
        const response = responseSuccess(
            "Cập nhật bài viết thành công",
            result,
            statusCodes.update,
        );
        res.status(response.statusCode).json(response)
    },
    async delete(req, res) {
        const result = await articleService.delete(req);
        const response = responseSuccess(
            "Xóa bài viết thành công",
            result,
            statusCodes.delete,
        );
        res.status(response.statusCode).json(response)

    }
}