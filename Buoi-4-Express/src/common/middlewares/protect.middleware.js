import { tokenService } from "../../services/token.service.js"
import { BadRequestException } from "../helpers/exception.helper.js"

export const protect = (req, res, next) => {
    const {accessToken} = req.cookies
    if(!accessToken) {
        throw new BadRequestException("Không có AccessToken")
    }
    // verify accessToken
    const decode = tokenService.verifyAccessToken(accessToken);
    next()
}