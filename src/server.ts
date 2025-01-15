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

const app = express();

// const PORT = process.env.PORT || 6000
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

swaggerDocs(app, PORT);

app.use(express.json());
app.use(cookieParser());



app.use("/api/users/", userRoutes);
app.use("/api/todo/", todoRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
