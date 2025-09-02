import express from "express";
import { castVote, getVotes } from "../controllers/vote.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vote
 *   description: Voting routes
 */

/**
 * @swagger
 * /vote/cast:
 *   post:
 *     summary: Cast a vote
 *     tags: [Vote]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user123
 *               option:
 *                 type: string
 *                 example: yes
 *     responses:
 *       201:
 *         description: Vote cast successfully
 */
router.post("/cast", castVote);

/**
 * @swagger
 * /vote:
 *   get:
 *     summary: Get all votes
 *     tags: [Vote]
 *     responses:
 *       200:
 *         description: List of votes
 */
router.get("/", getVotes);

export default router;
