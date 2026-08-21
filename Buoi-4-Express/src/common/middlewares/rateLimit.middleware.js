import rateLimit from "express-rate-limit"
import { TooManyRequestsException } from "../helpers/exception.helper.js"

// trong 15' req 100 lan
export const appLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 4, // gioi han 100 request  trong 15p dua tren ip
    standardHeaders: "draft-8", // dinh dang rate-limit header moi nhat tra ve cho fe
    legacyHeaders: false, // tat dinh dang rate-limit header cu
    handler: () => {
        throw new TooManyRequestsException("");
    }
})

// dang nhap 5 lan trong 10 phut tren 1 ip
export const limitLogin = rateLimit({
    windowMs: 15 * 6 * 1000,
    max: 40,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: () => {
        throw new TooManyRequestsException("Ban da dang nhap qua nhieu lan, vui long thu lai")
    }
})