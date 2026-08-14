import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Always enable SSL when connecting to hosted databases like Render
  ssl: process.env.DATABASE_URL?.includes('localhost') 
    ? false 
    : { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000, // Fails after 10s instead of hanging forever
});

export const query = (text, params) => pool.query(text, params);

export default pool;