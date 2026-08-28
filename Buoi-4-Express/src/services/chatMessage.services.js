import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const chatMessagesService = {
    async create(req) {
        return `This action create`;
    },

    async findAll(req) {
        // sequelize
        // return "list-article"
        // const resultSequelize = await articleModel.findAll();
        const { where, page, pageSize, index } = buildQueryPrisma(req)

        const resultPrisma = await prisma.chatMessages.findMany({
            where: where,
            skip: index, //offset
            take: pageSize,// Limit
            include: {
                Users: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        const totalItems = await prisma.chatMessages.count({
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

    async findOne(req) {
        return `This action returns a id: ${req.params.id} chatMessages`;
    },

    async update(req) {
        return `This action updates a id: ${req.params.id} chatMessages`;
    },

    async remove(req) {
        return `This action removes a id: ${req.params.id} chatMessages`;
    }
};