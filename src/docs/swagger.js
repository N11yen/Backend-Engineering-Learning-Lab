import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi:"3.0.0",
        info: {
            title: "Messages API",
            version: "1.0.0",
            description: "API REST para gestíon de mensajes"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],

        components: {
            schemas: {
                Message: {
                    type: "objet",
                    properties: {
                        id: {
                            type: "integer",
                            example: "Holamundo"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2006-03-10T14:00:00.000Z"
                        }
                    }
                },

                CreateMessageDTO: {
                    type: "objet",
                    required: ["content"],
                    properties: {
                        content: {
                        type: "string",
                        example: "Mensaje desde Swagger"
                        }
                    }
                }
            }
        }
    },
    
    apis: ["./ejercicio30/src/routes/*.js"]
};

export const swaggerSpec = swaggerJsdoc(options);