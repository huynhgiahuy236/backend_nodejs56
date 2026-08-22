import { where } from "sequelize";
import { prisma } from "../common/prisma/connect.prisma.js";
// import sequelize from "../common/sequelize/connect.sequelize.js"
import articleModel from "../models/article/article.model.js"
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";

//4 nơi nhận dữ liệu từ FE: body, header, query, params
export const articleService = {
    async findAll(req, res) {
        // sequelize
        // return "list-article"
        // const resultSequelize = await articleModel.findAll();
        const { where, page, pageSize, index } = buildQueryPrisma(req)

        const resultPrisma = await prisma.articles.findMany({
            where: where,
            skip: index, //offset
            take: pageSize,// Limit
        })
        const totalItems = await prisma.articles.count({
            where: where
        })
        const totalPage = Math.ceil(totalItems / pageSize);
        return {
            items: resultPrisma,
            totalItems: totalItems,
            totalPage: totalPage,
            page: page,
            pageSize: pageSize,
        }
    },
    async create(req) {
        const body = req.body
        // console.log({ body })
        const result = await prisma.articles.create({
            data: {
                title: body.title,
                Content: body.Content,
                userId: 2,
            }
        })
        return true;
    },
    async update(req) {
        const body = req.body
        const { articleID } = req.params;
        const result = await prisma.articles.update({
            where: { id: Number(articleID) },
            data: {
                title: body.title,
                Content: body.Content,
            }
        })
        // console.log(articleID,body)
        return true;
    },
    async delete(req) {
        const body = req.body
        const { articleID } = req.params;
        // console.log({ body })
        // Cách 1: không áp dụng delete thật trong db để xóa trực tiếp trên table do không có khả năng khôi phục
        // const result = await prisma.articles.delete({
        //     where: { id: Number(articleID) }
        // })
        // Cách 2 nên dùng
        await prisma.articles.delete({
            where: { id: Number(articleID) },
            data: {
                isDeleted: true,
                deleteAt: new Date(),
                deleteBy: 1
            }

        }); return true
    },
    async findOne(req) {
        // const body = req.body
        const { articleID } = req.params;
        const result = await prisma.articles.findUnique({
            where: { id: Number(articleID) },
        }); return result
    },

}


