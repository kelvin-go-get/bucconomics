import express from "express";
import {
  createCommunity,
  joinCommunity,
  getCommunities,
} from "../controllers/community.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Community
 *   description: Community management routes
 */

/**
 * @swagger
 * /community/create:
 *   post:
 *     summary: Create a new community
 *     tags: [Community]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Farmers United
 *               description:
 *                 type: string
 *                 example: A group for local farmers
 *     responses:
 *       201:
 *         description: Community created successfully
 *       400:
 *         description: Bad request
 */
router.post("/create", createCommunity);

/**
 * @swagger
 * /community/join:
 *   post:
 *     summary: Join an existing community
 *     tags: [Community]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64e74c88d52fdd82a81dc123
 *               communityId:
 *                 type: string
 *                 example: 64e74c88d52fdd82a81dc456
 *     responses:
 *       200:
 *         description: Successfully joined the community
 *       400:
 *         description: Bad request
 */
router.post("/join", joinCommunity);

/**
 * @swagger
 * /community:
 *   get:
 *     summary: Get all communities
 *     tags: [Community]
 *     responses:
 *       200:
 *         description: List of all communities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 64e74c88d52fdd82a81dc456
 *                   name:
 *                     type: string
 *                     example: Farmers United
 *                   description:
 *                     type: string
 *                     example: A group for local farmers
 */
router.get("/", getCommunities);

export default router;
