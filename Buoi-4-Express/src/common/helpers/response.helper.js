import { statusCodes } from "./statusCode.helper.js";

export const responseSuccess = ( result,messageText = "Lấy danh sách thành công", statusCode = statusCodes.OK) => {
    return {
        status: "success",
        statusCode: statusCode,
        message: messageText,
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