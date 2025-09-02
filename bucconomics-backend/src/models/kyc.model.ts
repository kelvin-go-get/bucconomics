import pool from "../config/db.config";

const KYC = {
  async createTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS kyc (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID NOT NULL,
        idType VARCHAR(255),
        idNumber VARCHAR(255),
        documentUrl VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ kyc table ensured");
  },

  async create({
    userId,
    idType,
    idNumber,
    documentUrl,
    status = "pending",
  }: {
    userId: string;
    idType: string;
    idNumber: string;
    documentUrl: string;
    status?: string;
  }) {
    const result = await pool.query(
      `
      INSERT INTO kyc (userId, idType, idNumber, documentUrl, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [userId, idType, idNumber, documentUrl, status]
    );
    return result.rows[0];
  },

  async findByUserId(userId: string) {
    const result = await pool.query(`SELECT * FROM kyc WHERE userId = $1`, [
      userId,
    ]);
    return result.rows[0];
  },

  async updateStatus(id: string, status: string) {
    const result = await pool.query(
      `UPDATE kyc SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  },

  async deleteById(id: string) {
    const result = await pool.query(
      `DELETE FROM kyc WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  },
};

export default KYC;
