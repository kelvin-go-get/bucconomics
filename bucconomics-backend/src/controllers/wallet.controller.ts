import { Request, Response } from "express";
import * as walletService from "../services/wallet.service";

export const connectWallet = async (req: Request, res: Response) => {
  try {
    const { userId, address } = req.body;
    const wallet = await walletService.connectWallet(userId, address);
    res.status(200).json({ message: "Wallet connected", wallet });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const balance = await walletService.getBalance(userId);
    res.status(200).json({ balance });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
};

export const getTokenInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const info = await walletService.getTokenInfo(userId);
    res.status(200).json(info);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
};
export const updateTokenBalance = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;
    const wallet = await walletService.updateTokenBalance(userId, amount);
    res.status(200).json({ message: "Token balance updated", wallet });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
};
