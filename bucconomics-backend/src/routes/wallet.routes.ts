import { Router } from "express";
import * as walletController from "../controllers/wallet.controller";

const router = Router();

/**
 * @swagger
 * /wallet/connect:
 *   post:
 *     summary: Connect a wallet
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - address
 *             properties:
 *               userId:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Wallet connected successfully
 *       500:
 *         description: Failed to connect wallet
 */
router.post("/connect", walletController.connectWallet);

/**
 * @swagger
 * /wallet/balance/{userId}:
 *   get:
 *     summary: Get wallet balance by user ID
 *     tags: [Wallet]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Wallet balance retrieved
 *       500:
 *         description: Failed to get balance
 */
router.get("/balance/:userId", walletController.getBalance);

/**
 * @swagger
 * /wallet/token-info/{userId}:
 *   get:
 *     summary: Get token info for a wallet
 *     tags: [Wallet]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Token info retrieved
 *       500:
 *         description: Failed to get token info
 */
router.get("/token-info/:userId", walletController.getTokenInfo);

export default router;
/**
 * @swagger
 * /wallet/update-balance:
 *   post:
 *     summary: Update token balance for a wallet
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Token balance updated successfully
 *       500:
 *         description: Failed to update token balance
 */
router.post("/update-balance", walletController.updateTokenBalance);
export const walletRoutes = router;
