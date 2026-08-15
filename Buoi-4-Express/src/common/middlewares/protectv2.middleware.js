import { where } from "sequelize"
import { tokenService } from "../../services/token.service.js"
import { BadRequestException, UnauthorizedException } from "../helpers/exception.helper.js"
import { prisma } from "../prisma/connect.prisma.js"

export const protectv2 = async (req, res, next) => {
    // dinh dang cua authen tren header: Bearer <accessToken>
    // buoc 1: lay token ra tu header
    const authHeader = req.headers.authorization
    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedException("Vui long dang nhap de tiep tuc")
    }

    // buoc 2: lay accessToken ra tu header
    const accessToken = authHeader.split(' ')[1]
    console.log(accessToken)
    // buoc3: kiem tra accessToken
    const decode = tokenService.verifyAccessToken(accessToken)
    if (!decode) {
        throw new UnauthorizedException("Tai khoan khong hop le")
    }

    const userExit = await prisma.users.findUnique({
        where: {
            id: decode.userId
        }
    })
    if (!userExit) {
        throw new BadRequestException("Nguoi dung khong ton tai")
    }
    req.user = userExit
    next()
}