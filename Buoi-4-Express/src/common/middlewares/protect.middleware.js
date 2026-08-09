import { BadRequestException } from "../helpers/exception.helper.js"

export const protect = (req, res, next) => {
    const {accessToken} = req.cookies
    if(!accessToken) {
        throw new BadRequestException("Không có AccessToken")
    }
    // verify accessToken
    

    next()
}