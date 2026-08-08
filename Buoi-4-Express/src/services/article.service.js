import { where } from "sequelize";
import { prisma } from "../common/prisma/connect.prisma.js";
// import sequelize from "../common/sequelize/connect.sequelize.js"
import articleModel from "../models/article/article.model.js"

//4 nơi nhận dữ liệu từ FE: body, header, query, params
export const articleService = {
    async findAll(req, res) {
        // sequelize
        // return "list-article"
        // const resultSequelize = await articleModel.findAll();
        let { page, pageSize, filters } = req.query
        // console.log(filters)

        try {
            filters = JSON.parse(filters)
        } catch (error) {
            filters = {};
        }
        
        Object.entries(filters).forEach(([key, value]) => {
            if (typeof value == "string") {
                filters[key] = {
                    contains: value,
                }
            }
        })
        const where = {
            isDeleted: false,
            ...filters
        }
        const pageDefault = 1
        const pageSizeDefault = 3

        // console.log(page, pageSize)
        page = Number(page)
        pageSize = Number(pageSize)

        //nếu gửi chữ 
        page = Number(page) || pageDefault
        pageSize = Number(pageSize) || pageSizeDefault
        // nếu gửi số âm
        if (page < 1) page = pageDefault;
        if (pageSize < 1) pageSize = pageSizeDefault

        const index = (page - 1) * pageSize;
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
        // const body = req.body 
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
        // const body = req.body
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
    }

}


