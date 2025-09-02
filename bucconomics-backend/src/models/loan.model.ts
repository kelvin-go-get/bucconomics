import pool from "../config/db.config";

export interface Loan {
  id?: number;
  userId: number;
  amount: number;
  status?: "pending" | "approved" | "rejected";
  repaymentAmount?: number;
  createdAt?: Date;
}

export const createLoan = async (loan: Loan) => {
  const result = await pool.query(
    `INSERT INTO loans (user_id, amount, status, repayment_amount, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING *`,
    [loan.userId, loan.amount, "pending", 0]
  );
  return result.rows[0];
};

export const getLoansByUser = async (userId: number) => {
  const result = await pool.query(`SELECT * FROM loans WHERE user_id = $1`, [
    userId,
  ]);
  return result.rows;
};

export const updateLoanStatus = async (
  id: number,
  status: "approved" | "rejected"
) => {
  const result = await pool.query(
    `UPDATE loans SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
};

export const repayLoan = async (id: number, amount: number) => {
  const result = await pool.query(
    `UPDATE loans SET repayment_amount = repayment_amount + $1 WHERE id = $2 RETURNING *`,
    [amount, id]
  );
  return result.rows[0];
};
