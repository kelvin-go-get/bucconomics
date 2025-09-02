import { Request, Response } from "express";

import * as LoanService from "../services/loan.service";

export const requestLoan = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const loan = await LoanService.requestLoan(userId, amount);
  res.status(200).json(loan);
};

export const getUserLoans = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const loans = await LoanService.getUserLoans(Number(userId));
  res.status(200).json(loans);
};

export const approveLoan = async (req: Request, res: Response) => {
  const { id } = req.params;
  await LoanService.approveLoan(Number(id));
  res.status(200).json({ message: "Loan approved" });
};

export const rejectLoan = async (req: Request, res: Response) => {
  const { id } = req.params;
  await LoanService.rejectLoan(Number(id));
  res.status(200).json({ message: "Loan rejected" });
};

export const repayLoan = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const loan = await LoanService.repay(Number(req.params.id), amount);
  res.status(200).json(loan);
};
