import { Request, Response } from "express";
import * as voteService from "../services/vote.service";

export const castVote = async (req: Request, res: Response) => {
  try {
    const vote = await voteService.castVote(req.body);
    res.status(201).json(vote);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(400).json({ error: errorMessage });
  }
};

export const getVotes = async (_req: Request, res: Response) => {
  try {
    const votes = await voteService.getVotes();
    res.status(200).json(votes);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
};
