import { prisma } from "../common/prisma/connect.prisma.js";
// import sequelize from "../common/sequelize/connect.sequelize.js"
import  articleModel  from "../models/article/article.model.js"

prisma
export const articleService = {
    async findAll(req, res) {
        // sequelize
        // return "list-article"
        // const resultSequelize = await articleModel.findAll();

        const resultPrisma= await prisma.articles.findMany()
        return resultPrisma
    }
}
