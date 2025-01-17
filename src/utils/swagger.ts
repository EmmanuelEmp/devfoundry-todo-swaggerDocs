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
                bearerAuth: [], // for authenticated routes
            },
        ],
        servers: [
            {
              url: "http://localhost:3000", // Local server
              description: "Local server",
            },
            {
              url: "https://devfoundry-todo-swaggerdocs-6.onrender.com", // Hosted server
              description: "Hosted server",
            },
          ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

// Function to set up Swagger docs
function swaggerDocs(app: Express, PORT: number) {
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(`Swagger Docs available at http://localhost:${PORT}/docs`);
}

export default swaggerDocs;
