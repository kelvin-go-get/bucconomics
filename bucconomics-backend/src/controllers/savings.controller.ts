import { Request, Response } from "express";
import * as savingsService from "../services/savings.service";

export const depositSavings = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  if (!userId || !amount) {
    return res.status(400).json({ error: "Missing userId or amount" });
  }

  try {
    const result = await savingsService.deposit(userId, amount);
    res.json(result);
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ error: "Deposit failed" });
  }
};

export const getSavingsBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const balance = await savingsService.getBalance(userId);
    res.json({ balance });
  } catch (error) {
    console.error("Get balance error:", error);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const history = await savingsService.getTransactions(userId);
    res.json({ history });
  } catch (error) {
    console.error("Transaction history error:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};
