import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from "../common/constants/app.constant.js"
import { BadRequestException } from "../common/helpers/exception.helper.js"
import jwt  from "jsonwebtoken"

export const tokenService = {
    createAccessToken(userId) {
        if (!userId) {
            throw new BadRequestException("không có userID để tạo accessToken")
        }
        const accessToken = jwt.sign(
            { userId: userId }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: "10s" }
        )
        return accessToken;
    },
    createRefreshToken(userId) {
        if (!userId) {
            throw new BadRequestException("không có userID để tạo accessToken")
        }
        const refreshToken = jwt.sign(
            { userId: userId }, REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" }
        )
        return refreshToken;
    },
    verifyAccessToken(accessToken, option) {
        const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, option)
        return decode
    },
    verifyRefreshToken(refreshToken, option) {
        const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, option)
        return decode
    }
}