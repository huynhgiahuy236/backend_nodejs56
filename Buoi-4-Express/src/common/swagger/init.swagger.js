export const swaggerDocument = {
    "openapi": "3.0.4",
    "info": {
        "title": "NodeJs-56 API",
        "description": "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
        "version": "0.1.9"
    },
    "servers": [
        {
            "url": "http://locahost:3069/api",
            "description": "Optional server description, e.g. Internal staging server for testing"
        },
        {
            "url": "http://huynhgiahuy.com/api",
            "description": "Optional server description, e.g. Main (production) server"
        }
    ],
    "paths": {
        "/users": {
            "get": {
                "summary": "Returns a list of users.",
                "description": "Optional extended description in CommonMark or HTML.",
                "responses": {
                    "200": {
                        "description": "A JSON array of user names",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, "paths": {
        "/article": {
            "get": {
                tags: ["article"],
                "summary": "Returns a list of users.",
                "parameters": [
                    {
                        "in": "query",
                        "name": "page",
                        "schema": {
                            type: "integer",
                            example: 1,
                            default: 1,
                        },
                        "description": "The number of items to skip before starting to collect the result set"
                    },
                    {
                        "in": "query",
                        "name": "pageSize",
                        "schema": {
                            type: "integer",
                            example: 3,
                            default: 3,
                        },
                        "description": "The numbers of items to return"
                    }
                ],
                "description": "Optional extended description in CommonMark or HTML.",
                "responses": {
                    "200": {
                        "description": "A JSON array of user names",
                        // "content": {
                        //     "application/json": {
                        //         "schema": {
                        //             "type": "array",
                        //             "items": {
                        //                 "type": "string"
                        //             }
                        //         }
                        //     }
                        // }
                    },
                    "400": {
                        "description": "400"
                    },
                    401: {
                        "description": "Unauthorized"
                    }
                }
            }
        }
    },

}