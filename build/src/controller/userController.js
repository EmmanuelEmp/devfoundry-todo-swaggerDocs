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
exports.getUserProfile = exports.logoutUser = exports.loginUser = exports.createUser = void 0;
const userModel_1 = require("../model/userModel");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @desc Register new user
// @route POST /register
// @access Public
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Check if user already exists
        const userExists = yield userModel_1.User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Create user
        const user = yield userModel_1.User.create({ firstName, lastName, email, password });
        if (user) {
            const token = (0, generateToken_1.default)(res, user._id);
            res.status(201).json({
                message: "User created successfully",
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
            });
            return;
        }
        else {
            res.status(400).json({ message: "Invalid user credentials" });
            return;
        }
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.createUser = createUser;
// @desc Login user
// @route POST /login
// @access Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.User.findOne({ email });
        if (user && (yield user.comparePassword(password))) {
            const token = (0, generateToken_1.default)(res, user._id);
            res.status(200).json({
                message: "User logged in successfully",
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token,
            });
            return;
        }
        else {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.loginUser = loginUser;
// @desc Logout user
// @route POST /logout
// @access Private
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "User successfully logged out" });
    return;
});
exports.logoutUser = logoutUser;
// @desc  Get current user profile
// @route GET /profile
// @access  Private
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error("Unauthorized");
        }
        const user = yield userModel_1.User.findById(req.user._id).select("-password");
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error getting profile:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.getUserProfile = getUserProfile;
// export const updateUser =async (req: Request, res: Response) => {
// }
