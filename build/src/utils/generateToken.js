"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "30d" });
    // store the token in cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
    });
    return token;
};
exports.default = generateToken;
