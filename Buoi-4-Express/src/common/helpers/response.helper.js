export const responseSuccess = (messageText = "Lấy danh sách thành công", result, statusCode = 200) => {
    return {
        status: "success",
        statusCode: statusCode,
        massage: messageText,
        doc: "swagger.com",
        data: result,
    }
}