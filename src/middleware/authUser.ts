import { Request, Response, NextFunction } from "express";
import { User } from "../model/userModel";
import jwt from "jsonwebtoken";

const authUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get the token from the request headers or cookies
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies?.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            res.status(401);
            return next(new Error("Not authorized, please login"));
        }

        // Verify the token
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);
        
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(401);
            return next(new Error("User not found"));
        }

        // Attach user to the request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401); // Unauthorized
        next(new Error("Invalid token"));
    }
};

export { authUser };
