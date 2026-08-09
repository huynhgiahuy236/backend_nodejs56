import { ACCESS_TOKEN_SECRET_KEY } from "../common/constants/app.constant.js"
import { BadRequestException } from "../common/helpers/exception.helper.js"
import jwt, { verify } from "jsonwebtoken"

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
    verifyAccessToken(accessToken,option ) {
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, option)
    }
}