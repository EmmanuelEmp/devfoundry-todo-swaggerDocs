import express, { Request, Response } from 'express';
import { User } from '../model/userModel';
import generateToken from '../utils/generateToken';

// @desc Register new user
// @route POST /register
// @access Public
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return
    }

    // Create user
    const user = await User.create({ firstName, lastName, email, password });

    if (user) {
      const token = generateToken(res, user._id);
      res.status(201).json({
        message: "User created successfully",
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      });
      return
    } else {
      res.status(400).json({ message: "Invalid user credentials" });
      return
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
    return
  }
};

// @desc Login user
// @route POST /login
// @access Public
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(res, user._id);
      res.status(200).json({
        message: "User logged in successfully",
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      });
      return
    } else {
      res.status(400).json({ message: "Invalid email or password" });
      return
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
    return
  }
};

// @desc Logout user
// @route POST /logout
// @access Private
export const logoutUser = async (req: Request, res: Response): Promise<void>=> {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User successfully logged out" });
  return
};

// @desc  Get current user profile
// @route GET /profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void>=>{
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  
    const user = await User.findById(req.user._id).select("-password"); // Exclude password
  
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ message: "Internal server error" });
    return
  }
}

// export const updateUser =async (req: Request, res: Response) => {
  

// }