import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../models/user.model";

// Utility to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility to check password strength
const isStrongPassword = (password: string): boolean => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return strongPasswordRegex.test(password);
};

export const register = async (email: string, password: string) => {
  try {
    // Check for existing user
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return {
        statusCode: 409,
        message: "User already exists",
      };
    }

    // Validate email
    if (!isValidEmail(email)) {
      return {
        statusCode: 400,
        message: "Invalid email format",
      };
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return {
        statusCode: 400,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      };
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    return {
      statusCode: 201,
      message: "Registration successful",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      statusCode: 500,
      message: "Registration failed. Please try again later.",
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        statusCode: 401,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return {
      statusCode: 200,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      },
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      statusCode: 500,
      message: error.message || "Login failed. Please try again.",
    };
  }
};
