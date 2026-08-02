import { statusCodes } from "./statusCode.helper.js";

export const responseSuccess = (messageText = "Lấy danh sách thành công", result, statusCode = statusCodes.OK) => {
    return {
        status: "success",
        statusCode: statusCode,
        massage: messageText,
        doc: "swagger.com",
        data: result,
    }
}

export const responseError = (
    message = "Internal server error",
    statusCode = statusCodes.INTERNAL_SERVER_ERROR,
    stack,
) => {
    return {
        status: "error",
        statusCode,
        message,
        stack,
        doc: "Swagger.com",
    };
};