"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const userModel_1 = require("../model/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get the token from the request headers or cookies
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            res.status(401);
            return next(new Error("Not authorized, please login"));
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = yield userModel_1.User.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(401);
            return next(new Error("User not found"));
        }
        // Attach user to the request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401);
        next(new Error("Invalid token"));
    }
});
exports.authUser = authUser;
