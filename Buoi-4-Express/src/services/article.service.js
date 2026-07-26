import sequelize from "../common/sequelize/connect.sequelize.js"
import  articleModel  from "../models/article/article.model.js"

export const articleService = {
    async findAll(req, res) {
        // sequelize
        // return "list-article"
        const result = await articleModel.findAll();
        return result
    }
}
