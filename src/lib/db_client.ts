import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Optional if you're loading from .env manually

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER_SETUP,
  password: process.env.DB_USER_SETUP_PASSWORD,
  database: process.env.DB_NAME,
  max: 10,               // optional: max number of connections
  idleTimeoutMillis: 30000, // optional: close idle clients after 30s
});