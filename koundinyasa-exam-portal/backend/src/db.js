import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const useSSL = process.env.DB_SSL === 'true';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: true } : false,
  max: Number(process.env.PG_MAX_CONNECTIONS || 5),
  connectionTimeoutMillis: 10000
});

pool.on('error', e =>
  console.error('PostgreSQL pool error:', e.message)
);

export const query = (sql, params = []) =>
  pool.query(sql, params);
