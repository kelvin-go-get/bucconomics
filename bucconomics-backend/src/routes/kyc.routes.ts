import { approveKYC } from "../controllers/kyc.controller";
import { submitKYC } from "../controllers/kyc.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { Router } from "express";

/**
 * @swagger
 * tags:
 *   - name: KYC
 *     description: KYC submission routes
 */

const router = Router();

/**
 * @swagger
 * /kyc:
 *   post:
 *     summary: Submit KYC information
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              idType:
 *                type: string
 *                example: "National ID"
 *              idNumber:
 *                type: string
 *                example: "12345678"
 *              document:
 *                type: string
 *                format: binary
 *     responses:
 *       200:
 *         description: KYC submitted
 */
router.post("/", verifyToken, submitKYC);

/**
 * @swagger
 * /kyc/{id}/approve:
 *   put:
 *     summary: Approve a KYC submission
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: KYC ID
 *     responses:
 *       200:
 *         description: KYC approved
 */
router.put("/:id/approve", verifyToken, approveKYC);

export const kycRoutes = router;
