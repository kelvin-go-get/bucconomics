import pool from "../config/db.config";

export const deposit = async (userId: string, amount: number) => {
  const query = `
    INSERT INTO Savings (userId, amount, createdAt)
    VALUES ($1, $2, NOW())
    RETURNING *;
  `;
  const result = await pool.query(query, [userId, amount]);
  return result.rows[0];
};

export const getBalance = async (userId: string) => {
  const query = `
    SELECT COALESCE(SUM(amount), 0) AS balance
    FROM Savings
    WHERE userId = $1;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0].balance;
};

export const getTransactions = async (userId: string) => {
  const query = `
    SELECT id, amount, createdAt
    FROM Savings
    WHERE userId = $1
    ORDER BY createdAt DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};
