import Community from "../models/community.model";
import User from "../models/user.model";
import { Request, Response } from "express";

export const createCommunity = async (req: Request, res: Response) => {
  const { name, description, createdBy } = req.body;
  try {
    const community = await Community.create({ name, description, createdBy });
    res.status(201).json(community);
  } catch (err) {
    res.status(500).json({
      error: "Community creation failed",
      details: err instanceof Error ? err.message : String(err),
    });
  }
};

export const joinCommunity = async (req: Request, res: Response) => {
  const { userId, communityId } = req.body;
  try {
    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({ error: "Community not found" });

    if (!community.members.includes(userId)) {
      community.members.push(userId);
      await community.save();
    }

    res
      .status(200)
      .json({ message: "Joined community successfully", community });
  } catch (err) {
    res.status(500).json({
      error: "Failed to join community",
      details: err instanceof Error ? err.message : String(err),
    });
  }
};

export const getCommunities = async (_req: Request, res: Response) => {
  const communities = await Community.find()
    .populate("createdBy")
    .populate("members");
  res.status(200).json(communities);
};
