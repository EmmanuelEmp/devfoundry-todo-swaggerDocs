import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB";
import { errorHandler, notFound } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDocs from "./utils/swagger"; 
dotenv.config();

connectDB();

const app: Express = express();


const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;


app.use(express.json());
app.use(cookieParser());


swaggerDocs(app, PORT);

// Redirect root URL ("/") to Swagger UI ("/docs")
app.get("/", (req: Request, res: Response) => {
  res.redirect("/docs");
});

// API routes
app.use("/api/users", userRoutes); 
app.use("/api/todo", todoRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
