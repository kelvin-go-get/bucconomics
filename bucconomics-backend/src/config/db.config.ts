import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "9046",
  database: process.env.DB_NAME || "bucconomics",
});

pool.on("error", (err: Error) => {
  console.error("❌ Unexpected PostgreSQL error", err);
  process.exit(-1);
});

export default pool;
