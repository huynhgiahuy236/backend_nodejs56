import { tokenService } from "../../services/token.service.js"
import { BadRequestException } from "../helpers/exception.helper.js"
import { prisma } from "../prisma/connect.prisma.js"

export const protect = async (req, res, next) => {
    const { accessToken } = req.cookies
    if (!accessToken) {
        throw new BadRequestException("Không có AccessToken")
    }
    // verify accessToken
    const decode = tokenService.verifyAccessToken(accessToken);
    const userExits = await prisma.users.findUnique({
        where: {
            id: decode.userId
        }
    })
    if (!userExits) {
        throw new BadRequestException("Người dùng không tồn tại")
    }
    console.log(userExits)
    req.user = userExits
    console.log(req.user)
    next()
}