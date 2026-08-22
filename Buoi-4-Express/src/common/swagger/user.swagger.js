export const user = {
    "/user/avatar-local": {
        post: {
            tags: ["user"],
            summary: "Returns a list of user.",
            description: "Optional extended description in CommonMark or HTML.",
            "requestBody": {
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "avatar": {
                                    "type": "string",
                                    format: "binary"
                                }
                            },
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "ok",
                }
            },
        }
    },
}