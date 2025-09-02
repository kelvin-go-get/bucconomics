import { Router } from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  getProfile,
} from "../controllers/auth.controller";
import { verifyToken as authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication and password management
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, fullName]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post("/signup", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset link to user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password using reset token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, newPassword]
 *             properties:
 *               token:
 *                 type: string
 *                 example: 123456abcdef
 *               newPassword:
 *                 type: string
 *                 example: NewStrongPass123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post("/reset-password", resetPassword);

/**
 * @swagger
 * /auth/profile/{id}:
 *   get:
 *     summary: Get a user's profile by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/profile/:id", getProfile);

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Update a user's profile
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - walletAddress
 *               - fullName
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64d0b3fefc13ae736c000001
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               walletAddress:
 *                 type: string
 *                 example: 0x123abc456def
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Missing required fields
 */
router.put("/profile", updateProfile);

export default router;
