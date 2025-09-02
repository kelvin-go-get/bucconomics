import pool from "../config/db.config";

// Create table if not exists
const createWalletTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Wallet (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID NOT NULL,
        address VARCHAR NOT NULL,
        tokenBalance FLOAT DEFAULT 0,
        governanceWeight FLOAT DEFAULT 0
      );
    `);
  } catch (error) {
    console.error("❌ Failed to create Wallet table", error);
  }
};

// Define Wallet as an object with useful DB methods
export const Wallet = {
  create: async (wallet: {
    userId: string;
    address: string;
    tokenBalance?: number;
    governanceWeight?: number;
  }) => {
    try {
      const result = await pool.query(
        `INSERT INTO Wallet (userId, address, tokenBalance, governanceWeight)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [
          wallet.userId,
          wallet.address,
          wallet.tokenBalance ?? 0,
          wallet.governanceWeight ?? 0,
        ]
      );
      return result.rows[0];
    } catch (err) {
      console.error("❌ Error creating wallet", err);
      throw err;
    }
  },

  findByUserId: async (userId: string) => {
    try {
      const result = await pool.query(
        `SELECT * FROM Wallet WHERE userId = $1`,
        [userId]
      );
      return result.rows[0];
    } catch (err) {
      console.error("❌ Error fetching wallet", err);
      throw err;
    }
  },

  getAll: async () => {
    try {
      const result = await pool.query(`SELECT * FROM Wallet`);
      return result.rows;
    } catch (err) {
      console.error("❌ Error getting all wallets", err);
      throw err;
    }
  },
};

// Call the table creator when this file is imported
createWalletTable();
