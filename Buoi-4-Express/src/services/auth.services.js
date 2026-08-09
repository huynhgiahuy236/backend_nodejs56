import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt"
import { tokenService } from "./token.service.js";

export const authService = {
    async register(req) {

        //bcrypt - hashpassword, khong the dich nguoc lai
        // chi co the so sanh
        // 10 la so lan băm, số càng lớn càng cao nhưng sẽ tốn thời gian - 10 là con số được khuyen dùng
        const hashPassword = bcrypt.hashSync(password, 10)


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
            throw new BadRequestException("Tài khoản đã được đăng ký");
        }

        // neu chua dang ky -> tao moi user
        const newUser = await prisma.users.create({
            data: {
                email: email,
                password: hashPassword,
                fullName: fullName
            }
        })

        return true;
    },
    async login(req) {
        const { body } = req.body
        console.log(body)
        // kiểm tra đăng ký chưa 
        const userExit = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        // chưa -> yêu cầu đăng kí
        if (!userExit) {
            throw new BadRequestException("Tài khoản chưa được đăng ký");
        }
        // đã đăng ký -> xử lý đăng nhập
        const isPassWordValid = bcrypt.compareSync(password, userExit.password)  // boolean
        if (!isPassWordValid) {
            throw new BadRequestException("Thông tin tài khoản không chính xác");
        }
        const accessToken = tokenService.createAccessToken(userExit.id)
        // refreshToken dùng để làm mới do hết hạn lưu ở hai chỗ Localstore hoặc Cookies  
        const refreshToken = "";

        return { accessToken: accessToken, refreshToken: refreshToken }
    },
    async getInfo(req) {
        return "info";
    }

};