import pool from "../config/db.config";

export interface Savings {
  id: string;
  userId: string;
  amount: number;
  createdAt: string;
}
export const createSavingsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Savings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID NOT NULL,
        amount FLOAT NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Savings table created");
  } catch (err) {
    console.error("❌ Error creating Savings table", err);
  }
};
