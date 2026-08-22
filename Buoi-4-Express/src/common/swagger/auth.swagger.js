export const auth = {
    "/auth/login": {
        post: {
            tags: ["auth"],
            summary: "Returns a list of login.",
            description: "Optional extended description in CommonMark or HTML.",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    example: "test@gmail.com"
                                },
                                "password": {
                                    "type": "string",
                                    example: "123"
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
    "/auth/register": {
        post: {
            tags: ["auth"],
            summary: "Returns a list of register.",
            description: "Optional extended description in CommonMark or HTML.",
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    example: "testwewe@gmail.com"
                                },
                                "password": {
                                    "type": "string",
                                    example: "12113"
                                },
                                fullName: {
                                    type: "string",
                                    example: "huynhgiahuy"
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
        },
    }
}