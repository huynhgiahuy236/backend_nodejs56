import { BadRequestException } from "../common/helpers/exception.helper.js"
import jwt from "jsonwebtoken"
export const tokenService = {
    createAccessToken(userID) {
        if (!userID) {
            throw new BadRequestException("không có userID để tạo accessToken")
        }
        const accessToken = jwt.sign(
            { userID: userID }, "secret", { expiresIn: "10s" }
        )
        return accessToken;
    }
}