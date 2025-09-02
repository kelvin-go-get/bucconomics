import { Router } from "express";
import * as savingsController from "../controllers/savings.controller";

const router = Router();

/**
 * @swagger
 * /savings/deposit:
 *   post:
 *     summary: Make a savings deposit
 *     tags: [Savings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *             required:
 *               - userId
 *               - amount
 *     responses:
 *       200:
 *         description: Deposit successful
 *       400:
 *         description: Invalid input
 */
router.post("/deposit", savingsController.depositSavings);

/**
 * @swagger
 * /savings/{userId}:
 *   get:
 *     summary: Get user’s savings balance
 *     tags: [Savings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Returns savings balance
 */
router.get("/:userId", savingsController.getSavingsBalance);

/**
 * @swagger
 * /savings/transactions/{userId}:
 *   get:
 *     summary: View user’s deposit history
 *     tags: [Savings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Returns user's deposit transactions
 */
router.get("/transactions/:userId", savingsController.getTransactionHistory);

export const savingsRoutes = router;
