import * as LoanModel from "../models/loan.model";

export const requestLoan = async (userId: number, amount: number) => {
  return await LoanModel.createLoan({ userId, amount });
};

export const getUserLoans = async (userId: number) => {
  return await LoanModel.getLoansByUser(userId);
};

export const approveLoan = async (loanId: number) => {
  return await LoanModel.updateLoanStatus(loanId, "approved");
};

export const rejectLoan = async (loanId: number) => {
  return await LoanModel.updateLoanStatus(loanId, "rejected");
};

export const repay = async (loanId: number, amount: number) => {
  return await LoanModel.repayLoan(loanId, amount);
};
export const getLoanDetails = async (loanId: number) => {
  const loans = await LoanModel.getLoansByUser(loanId);
  return loans.find((loan) => loan.id === loanId);
};
