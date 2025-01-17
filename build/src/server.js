"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = require("./config/connectDB");
const errorHandler_1 = require("./middleware/errorHandler");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = __importDefault(require("./utils/swagger"));
dotenv_1.default.config();
(0, connectDB_1.connectDB)();
const app = (0, express_1.default)();
// const PORT = process.env.PORT || 6000
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
(0, swagger_1.default)(app, PORT);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/users/", userRoutes_1.default);
app.use("/api/todo/", todoRoutes_1.default);
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log("server running on " + PORT);
});
