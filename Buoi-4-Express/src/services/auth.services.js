import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";


export const authService = {
    async register(req) {
        const { email, password, fullName } = req.body
        console.log(email, password, fullName)
        // kiem tra email da duoc dang ki chua
        const userExit = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        console.log(userExit)
        // neu roi -> tu choi
        if (userExit) {
            throw new BadRequestException("Email đã được đăng ký");
        }

        // neu chua dang ky -> tao moi user
        const newUser = await prisma.users.create({
            data: {
                email: email,
                password: password,
                fullName: fullName
            }
        })

        return true;
    },
    async login(req) {
        const { email, password } = req.body
        console.log(email, password)
        return `This action returns all login`;
    },

};