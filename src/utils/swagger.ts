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
            securitySchemes: { // Corrected key name to "securitySchemes"
                bearerAuth: {
                    type: "http",
                    scheme: "bearer", // Fixed typo: "schema" -> "scheme"
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Applies bearerAuth globally to routes requiring authentication
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Ensure this matches your actual route file paths
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
