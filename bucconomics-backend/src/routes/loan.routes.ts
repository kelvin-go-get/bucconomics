import { Request, Response } from "express";
import * as LoanController from "../controllers/loan.controller";
import { Router } from "express";

/**
 * @swagger
 * tags:
 *   - name: Loan
 *     description: Loan management routes
 */
const router = Router();
/**
 * @swagger
 * /loan/request:
 *   post:
 *     summary: Request a loan
 *     tags: [Loan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               amount:
 *                 type: number
 *             required:
 *               - userId
 *               - amount
 *     responses:
 *       200:
 *         description: Loan request submitted successfully
 */
router.post("/request", LoanController.requestLoan);

/**
 * @swagger
 * /loan/user/{userId}:
 *   get:
 *     summary: Get all loan applications for a user
 *     tags: [Loan]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of loans
 */
router.get("/user/:userId", LoanController.getUserLoans);

/**
 * @swagger
 * /loan/{id}/approve:
 *   put:
 *     summary: Admin approves a loan
 *     tags: [Loan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Loan approved
 */
router.put("/:id/approve", LoanController.approveLoan);

/**
 * @swagger
 * /loan/{id}/reject:
 *   put:
 *     summary: Admin rejects a loan
 *     tags: [Loan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Loan rejected
 */
router.put("/:id/reject", LoanController.rejectLoan);

/**
 * @swagger
 * /loan/{id}/repay:
 *   post:
 *     summary: Repay a loan
 *     tags: [Loan]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Loan repayment recorded
 */
router.post("/:id/repay", LoanController.repayLoan);

export const loanRoutes = router;
