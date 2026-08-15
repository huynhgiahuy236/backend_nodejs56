import { responseError } from "./response.helper.js"
import jwt from "jsonwebtoken"
import { statusCodes } from "./statusCode.helper.js"
export const appError = (err, req, res, next) => {
    //mid err dac biet
    // jsonWebToken err: xu ly tat ca cac loi lien quan den token, khong chua loi nao
    if( err instanceof jwt.JsonWebTokenError){
        err.code = statusCodes.UNAUTHORIZED
        // fe se yeu cau login lai - 401
    }
    // tokenExpired err: xu li nhung lien quan den token het han
    if (err instanceof jwt.TokenExpiredError){
        err.code = statusCodes.FORBIDDEN
        // fe se goi refreshtoken - 403
    }
    const response = responseError(err?.message, err?.code, err?.stack)
    res.status(response.statusCode).json(response)
}