import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// Helper: generate JWT
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashed,
      fullName,
    });

    const token = generateToken(user.id.toString());
    res.json({
      token,
      user: { id: user.id, email: user.email, fullName: user.fullName },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user.id.toString());
    res.json({
      token,
      user: { id: user.id, email: user.email, fullName: user.fullName },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

// Forgot Password (send token)
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);
    if (!user)
      return res.status(400).json({ error: "No user with this email" });

    const token = Math.random().toString(36).substr(2);
    const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 mins

    await User.setResetToken(email, token, expiry);

    // TODO: send email (for now, return token in response)
    res.json({ message: "Password reset link sent", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset password" });
  }
};

// Reset Password
// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findByResetToken(token);

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(user.id, hashed);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset password" });
  }
};

// Get profile (id is required as a param)
export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // userId from params
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update profile (id + walletAddress required, fullName optional but validated)
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id, walletAddress, fullName } = req.body;

    if (!id || !walletAddress) {
      return res
        .status(400)
        .json({ error: "User ID and wallet address are required" });
    }

    if (!fullName) {
      return res.status(400).json({ error: "Full name is required" });
    }

    const updatedUser = await User.update(id, {
      fullName,
      walletAddress,
      isProfileComplete: true,
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
