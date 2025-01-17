import express, { Express, Request, Response } from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";

// Swagger options
const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TODO REST API Docs",
            version,
        },
        components: {
            schemas: {
                UserRegistration: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string",
                            example: "John",
                        },
                        lastName: {
                            type: "string",
                            example: "Doe",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "johndoe@gmail.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "strongpassword123",
                        },
                    },
                },
                UserLogin: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "john.doe@gmail.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "strongpassword123",
                        },
                    },
                },
                UserLogout: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "User successfully logged out",
                        },
                    },
                },
                UserProfile: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string",
                            example: "John",
                        },
                        lastName: {
                            type: "string",
                            example: "Doe",
                        },
                        email: {
                            type: "string",
                            example: "john.doe@example.com",
                        },
                    },
                },
                // Todo-related schemas
                Task: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            example: "60fdb83f3b4d4a4d0d8f49c5",
                        },
                        task: {
                            type: "string",
                            example: "Complete project documentation",
                        },
                        start: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-01T09:00:00Z",
                        },
                        stop: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-01T17:00:00Z",
                        },
                        user: {
                            type: "string",
                            example: "60fdb83f3b4d4a4d0d8f49c5",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-11-01T10:00:00Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-11-02T10:00:00Z",
                        },
                    },
                },
                GetTask: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            example: "60fdb83f3b4d4a4d0d8f49c5",
                        },
                        task: {
                            type: "string",
                            example: "Complete project documentation",
                        },
                        start: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-01T09:00:00Z",
                        },
                        stop: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-01T17:00:00Z",
                        },
                        user: {
                            type: "string",
                            example: "60fdb83f3b4d4a4d0d8f49c5",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-11-01T10:00:00Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-11-02T10:00:00Z",
                        },
                    },
                },
                CreateTask: {
                    type: "object",
                    properties: {
                        task: {
                            type: "string",
                            example: "Complete project documentation",
                        },
                        start: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-01T09:00:00Z",
                        },
                        stop: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-01T17:00:00Z",
                        },
                    },
                },
                UpdateTask: {
                    type: "object",
                    properties: {
                        task: {
                            type: "string",
                            example: "Update project timeline",
                        },
                        start: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-02T10:00:00Z",
                        },
                        stop: {
                            type: "string",
                            format: "date-time",
                            example: "2024-12-02T18:00:00Z",
                        },
                    },
                },
                DeleteTask: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Task deleted successfully",
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
            {
                url: "https://devfoundry-todo-swaggerdocs-6.onrender.com/docs",
                description: "Hosted server",
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

// Function to set up Swagger docs
function swaggerDocs(app: Express, PORT: number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(`Swagger Docs available at http://localhost:${PORT}/docs`);
}

export default swaggerDocs;
