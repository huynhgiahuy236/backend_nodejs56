export const responseSuccess = (messageText = "Lấy danh sách thành công", result, statusCode = statusCodes.OK) => {
    return {
        status: "success",
        statusCode: statusCode,
        massage: messageText,
        doc: "swagger.com",
        data: result,
    }
}